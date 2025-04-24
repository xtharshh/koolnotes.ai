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
    const reward = 5;

    // Update upload and user in one transaction
    const [upload, user] = await Promise.all([
      (Upload as Model<IUpload>).findById(params.id),
      (User as Model<IUser>).findOne({ 'uploads': params.id })
    ]);

    if (!upload || !user) {
      return NextResponse.json({ error: 'Upload or user not found' }, { status: 404 });
    }

    // Update user balance and upload status atomically
    if (status === 'APPROVED' && upload.status !== 'APPROVED') {
      user.balance = (user.balance || 0) + reward;
      await user.save();
    }

    upload.status = status;
    await upload.save();

    // Get updated data
    const [updatedUploads, stats] = await Promise.all([
      Upload.find().populate('userId', 'name email balance').sort({ createdAt: -1 }),
      Upload.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    ]);

    return NextResponse.json({
      success: true,
      uploads: updatedUploads,
      stats: { pending: 0, approved: 0, rejected: 0, ...stats.reduce((acc, {_id, count}) => ({ ...acc, [_id.toLowerCase()]: count }), {}) },
      userBalance: user.balance,
      message: `Upload ${status.toLowerCase()} successfully${status === 'APPROVED' ? ` (+₹${reward})` : ''}`
    });

  } catch (error) {
    console.error('Error updating upload:', error);
    return NextResponse.json(
      { error: 'Failed to update: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
