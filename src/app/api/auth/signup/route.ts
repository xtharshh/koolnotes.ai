import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { dbConnect } from '../../../../utils/dbConfig';
import { User } from '../../../../models/user';
import { Model } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    console.log('Signup request:', { name, email, passwordLength: password?.length });

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user exists
    const existingUser = await (User as Model<IUser>).findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user with explicit password field
    const user = await (User as Model<IUser>).create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      uploads: [],
      earnings: 0,
      role: 'USER'
    });

    console.log('User created:', {
      id: user._id,
      email: user.email,
      hasPassword: !!user.password
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
