import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { dbConnect } from '../../../../utils/dbConfig';
import { User } from '../../../../models/user';
import { Upload, IUpload } from '../../../../models/models';
import { Model } from 'mongoose';

export interface IUser {
  _id: string;
  email: string;
  name: string;
  earnings: number;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const user = await (User as Model<IUser>).findById(session.user.id);
    const uploads = await (Upload as Model<IUpload>).find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .select('title status price createdAt');

    return NextResponse.json({
      uploads,
      earnings: user.earnings || 0
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
