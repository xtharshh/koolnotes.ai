import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, IUser } from '../auth/[...nextauth]/route';
import { IUpload, Upload, User } from '../../../models/models';
import { dbConnect } from '../../../utils/dbConfig';
import { Model } from 'mongoose';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.description || !data.subject || !data.fileUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await (User as Model<IUser>).findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const upload = await (Upload as Model<IUpload>).create({
      ...data,
      userId: user._id,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      price: 0,
    });

    // Update user's uploads array
    await (User as Model<IUser>).findByIdAndUpdate(
      user._id,
      { $push: { uploads: upload._id } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Upload created successfully',
      upload
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to create upload' },
      { status: 500 }
    );
  }
}