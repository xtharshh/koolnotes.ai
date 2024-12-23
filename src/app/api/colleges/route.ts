import { dbConnect } from '../../../utils/dbConfig';
import { College } from '../../../models/models';
import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '../../../middleware/middleware';

// Connect to the database
await dbConnect();

export async function POST(req: NextRequest) {
  const middlewareResponse = middleware(req);
  if (middlewareResponse.status === 401) {
    return middlewareResponse; // Return the 401 response from middleware
  }

  try {
    const reqBody = await req.json();
    const { name, branches } = reqBody;

    // Check if the college already exists
    const colleges = await College.findOne({ name });
    if (colleges) {
      return NextResponse.json({ error: "College already exists" }, { status: 400 });
    }

    // Create a new college
    const newCollege = new College({ name, branches });
    const nayaCollege = await newCollege.save();

    // Return success response
    return NextResponse.json({ message: "College created successfully", colleges: nayaCollege });

  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const middlewareResponse = middleware(req);
  if (middlewareResponse.status === 401) {
    return middlewareResponse; // Return the 401 response from middleware
  }

  try {
    // Fetch all colleges
    const colleges = await College.find();

    // Return the list of colleges
    return NextResponse.json({ colleges }, { status: 200 });

  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const middlewareResponse = middleware(req);
  if (middlewareResponse.status === 401) {
    return middlewareResponse; // Return the 401 response from middleware
  }

  try {
    const reqBody = await req.json();
    const { name, newName, branches } = reqBody;

    console.log('Received college name:', name);

    // Find the college by name and update its details
    const updatedCollege = await College.findOneAndUpdate(
      { name },
      { name: newName, branches },
      { new: true }
    );

    if (!updatedCollege) {
      console.log('College not found for name:', name);
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ message: "College updated successfully", colleges: updatedCollege });

  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
