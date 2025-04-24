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

    // First find the upload
    const upload = await (Upload as Model<IUpload>).findById(params.id);
    if (!upload) {
      return NextResponse.json({ 
        error: `Upload with ID ${params.id} not found`,
        uploads: [], 
        stats: { pending: 0, approved: 0, rejected: 0 } 
      }, { status: 404 });
    }

    // Then find the user
    const user = await (User as Model<IUser>).findById(upload.userId);
    if (!user) {
      return NextResponse.json({ 
        error: `User not found for upload ${params.id}`,
        uploads: [],
        stats: { pending: 0, approved: 0, rejected: 0 }
      }, { status: 404 });
    }

    // Update user balance and upload status
    if (status === 'APPROVED' && upload.status !== 'APPROVED') {
      user.balance = (user.balance || 0) + reward;
      await user.save();
    }

    upload.status = status;
    await upload.save();

    // Get updated data
    const [updatedUploads, stats] = await Promise.all([
      (Upload as Model<IUpload>).find().populate('userId', 'name email balance').sort({ createdAt: -1 }),
      Upload.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    ]);

    return NextResponse.json({
      success: true,
      uploads: updatedUploads,
      stats: stats.reduce((acc, curr) => {
        acc[curr._id.toLowerCase()] = curr.count;
        return acc;
      }, { pending: 0, approved: 0, rejected: 0 }),
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
