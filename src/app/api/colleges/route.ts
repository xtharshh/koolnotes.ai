import { dbConnect } from '../../../utils/dbConfig';
import { College } from '../../../models/models';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
await dbConnect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { name, branches } = reqBody;
        console.log('reqBody:', reqBody);

        // Check if the college already exists
        const college = await College.findOne({ name });
        if (college) {
            return NextResponse.json({ error: "College already exists" }, { status: 400 });
        }

        // Create a new college
        const newCollege = new College({ name, branches });
        const nayaCollege=await newCollege.save();

        // Return success response
        return NextResponse.json({ message: "College created successfully", college: nayaCollege });

    } catch (error) {
        console.log('Error:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function GET() {
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
