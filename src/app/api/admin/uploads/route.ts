import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { IUpload, Upload } from '../../../../models/models';
import { dbConnect } from '../../../../utils/dbConfig';
import { Model } from 'mongoose';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Not authorized as admin' }, { status: 403 });
    }

    await dbConnect();

    const [pendingUploads, stats] = await Promise.all([
      (Upload as Model<IUpload>).find()  // Remove status filter to get all uploads
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .lean(),
      Upload.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    if (!pendingUploads) {
      return NextResponse.json({ error: 'No uploads found' }, { status: 404 });
    }

    const statusCounts = stats.reduce((acc, curr) => {
      acc[curr._id.toLowerCase()] = curr.count;
      return acc;
    }, { pending: 0, approved: 0, rejected: 0 });

    return NextResponse.json({
      success: true,
      uploads: pendingUploads,
      stats: statusCounts,
      adminRole: session.user.role  // Add role confirmation in response
    });
  } catch (error) {
    console.error('Error in admin uploads GET:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
