/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { IUpload, IUser, Upload, User } from '../../../../../models/models';
import { dbConnect } from '../../../../../utils/dbConfig';
import { Model } from 'mongoose';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { status } = await request.json();
    const reward = 5; // Amount to add per approved upload

    // Find the upload first
    const upload = await (Upload as Model<IUpload>).findById(params.id);
    if (!upload) {
      return NextResponse.json({ error: 'Upload not found' }, { status: 404 });
    }

    // If approving and not already approved, update user balance first
    if (status === 'APPROVED' && upload.status !== 'APPROVED') {
      const user = await (User as Model<IUser>).findById(upload.userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      user.balance = (user.balance || 0) + reward;
      await user.save();
    }

    // Update upload status
    upload.status = status;
    await upload.save();

    // Get fresh data including total approved uploads and balance
    const [updatedUploads, stats, updatedUser] = await Promise.all([
      (Upload as Model<IUpload>).find()
        .populate('userId', 'name email balance')
        .sort({ createdAt: -1 }),
      Upload.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      (User as Model<IUser>).findById(upload.userId._id)
    ]);

    // Get user's current balance
    const currentBalance = await (User as Model<IUser>)
      .findById(upload.userId)
      .select('balance');

    // Calculate total earnings (number of approved uploads * reward)
    const approvedCount = stats.find(s => s._id === 'APPROVED')?.count || 0;
    const totalEarnings = approvedCount * reward;

    return NextResponse.json({
      success: true,
      uploads: updatedUploads,
      stats: stats.reduce((acc, curr) => {
        acc[curr._id.toLowerCase()] = curr.count;
        return acc;
      }, { pending: 0, approved: 0, rejected: 0 }),
      updatedBalance: currentBalance?.balance || 0,
      totalEarnings,
      message: `Upload ${status.toLowerCase()} successfully${status === 'APPROVED' ? ` and balance updated (+₹${reward})` : ''}`
    });
  } catch (error) {
    console.error('Error updating upload:', error);
    return NextResponse.json(
      { error: 'Failed to update upload: ' + error.message },
      { status: 500 }
    );
  }
}
