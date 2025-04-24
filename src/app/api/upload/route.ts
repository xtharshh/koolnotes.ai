import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { Upload, User } from '../../../models/models';
import { dbConnect } from '../../../utils/dbConfig';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const formData = await request.formData();
    
    // Extract data from FormData
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const subject = formData.get('subject') as string;
    const price = formData.get('price') ? Number(formData.get('price')) : 0;
    const file = formData.get('file') as File;

    if (!title || !description || !subject || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create upload record
    const upload = await Upload.create({
      title,
      description,
      subject,
      price,
      fileUrl: 'temporary-url', // Replace with actual file URL after upload
      userId: user._id,
      status: 'PENDING',
      paymentStatus: 'PENDING'
    });

    return NextResponse.json({
      success: true,
      message: 'Upload created successfully',
      upload
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}