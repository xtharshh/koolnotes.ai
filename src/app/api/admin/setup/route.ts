/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { dbConnect } from '../../../../utils/dbConfig';
import { User } from '../../../../models/user';
import { Model } from 'mongoose';
import { IUser } from '../../../../models/models';

const ADMIN_SECRET = process.env.ADMIN_SETUP_SECRET;

export async function GET() {
  try {
    await dbConnect();
    
    const existingAdmin = await (User as Model<IUser>).findOne({ role: 'ADMIN' })
      .select('-password')
      .lean();

    if (existingAdmin) {
      return NextResponse.json({
        exists: true,
        email: existingAdmin.email
      });
    }

    return NextResponse.json({ exists: false });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Admin setup not configured' },
        { status: 500 }
      );
    }

    const { email, password, secret } = await request.json();

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized setup attempt' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Check if admin exists
    const existingAdmin = await (User as Model<IUser>).findOne({ role: 'ADMIN' });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }

    // Create admin user
    const hashedPassword = await hash(password, 12);
    const admin = await (User as Model<IUser>).findOneAndUpdate(
      { email },
      { role: 'ADMIN' },
      { new: true }
    );

    if (!admin) {
      return NextResponse.json({ error: 'Failed to set admin role' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Admin role set successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
