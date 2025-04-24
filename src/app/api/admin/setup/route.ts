/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { dbConnect } from '../../../../utils/dbConfig';
import { User } from '../../../../models/models';
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

    // Validate input
    if (!email || !password || !secret) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized setup attempt' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Check if admin exists
    const existingAdmin = await User.findOne({ role: 'ADMIN' });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }

    // Create admin user
    const hashedPassword = await hash(password, 12);
    await User.create({
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
      balance: 0,
      uploads: []
    });

    return NextResponse.json(
      { message: 'Admin created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
