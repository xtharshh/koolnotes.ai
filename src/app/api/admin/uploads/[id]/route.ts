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

    // Find the upload and populate user details
    const upload = await (Upload as Model<IUpload>).findById(params.id)
      .populate('userId', 'name email balance');

    if (!upload) {
      return NextResponse.json({ error: 'Upload not found' }, { status: 404 });
    }

    // If approving and not already approved, update user balance
    if (status === 'APPROVED' && upload.status !== 'APPROVED') {
      const updatedUser = await (User as Model<IUser>).findByIdAndUpdate(
        upload.userId._id,
        { $inc: { balance: reward } },
        { new: true }
      );
      
      // Verify balance was updated
      if (!updatedUser) {
        throw new Error('Failed to update user balance');
      }
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
      updatedBalance: updatedUser?.balance || 0,
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
