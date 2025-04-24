import { NextResponse } from 'next/server';
import { Upload, IUpload } from '../../../models/models';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { Model } from 'mongoose';
import { validateUpload } from '../../../lib/validation';
import mongoose from 'mongoose';
import { uploadToGoogleDrive } from '../../../lib/storage';

// Extending the NextAuth session object
declare module 'next-auth' {
  interface Session {
    user: {
      role: unknown;
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Upload handler for POST request
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const formData = await request.formData();
    
    // Input validation with detailed errors
    const validationResult = validateFormData(formData);
    if (!validationResult.valid) {
      return NextResponse.json({ error: validationResult.error }, { status: 400 });
    }

    const { title, description, subject, price, file } = validationResult.data;

    console.log('Processing upload:', {
      title,
      description,
      subject,
      price,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    // Validate file
    const fileValidation = await validateUpload(file);
    if (!fileValidation.valid) {
      return NextResponse.json({ error: fileValidation.error }, { status: 400 });
    }

    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI!);
    }

    try {
      // Upload file and get URL
      console.log('Starting file upload to Google Drive:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      const fileUrl = await uploadToStorage(file);
      
      if (!fileUrl || typeof fileUrl !== 'string') {
        return NextResponse.json(
          { 
            error: 'File upload failed', 
            details: 'No URL returned from storage service' 
          },
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      console.log('File uploaded successfully:', { fileUrl });
      
      // Create document with proper typing
      const uploadData = {
        title,
        description,
        subject,
        fileUrl,
        userId: new mongoose.Types.ObjectId(session.user.id),
        price: Number(price),
        status: 'PENDING' as const
      };

      console.log('Creating upload record:', uploadData);

      const upload = await (Upload as Model<IUpload>).create(uploadData);
      
      if (!upload) {
        console.error('Failed to create upload record in database');
        return NextResponse.json({ 
          error: 'Failed to create upload record',
          details: 'Database operation returned null'
        }, { status: 500 });
      }

      console.log('Upload record created successfully:', upload);

      return NextResponse.json(
        { 
          message: 'File uploaded successfully',
          upload,
          ok: true,
          fileUrl
        },
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database operation failed', details: dbError instanceof Error ? dbError.message : 'Unknown error' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Upload processing error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process upload', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

function validateFormData(formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const subject = formData.get('subject');
  const price = formData.get('price');
  const file = formData.get('file');

  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Invalid title' };
  }
  if (!description || typeof description !== 'string') {
    return { valid: false, error: 'Invalid description' };
  }
  if (!subject || typeof subject !== 'string') {
    return { valid: false, error: 'Invalid subject' };
  }
  if (!price || isNaN(Number(price))) {
    return { valid: false, error: 'Invalid price' };
  }
  if (!file || !(file instanceof File)) {
    return { valid: false, error: 'Invalid file' };
  }

  return {
    valid: true,
    data: { title, description, subject, price: Number(price), file }
  };
}

// Placeholder for cloud storage integration
async function uploadToStorage(file: File): Promise<string> {
  try {
    console.log('Uploading to Google Drive:', file.name);
    const url = await uploadToGoogleDrive(file);
    
    if (!url) {
      throw new Error('No URL returned from Google Drive upload');
    }
    
    console.log('Google Drive upload successful:', url);
    return url;
  } catch (error) {
    console.error('Google Drive upload error:', error);
    throw new Error(
      `Failed to upload to Google Drive: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}