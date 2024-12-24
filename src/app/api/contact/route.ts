import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Your SMTP host
      port: 587, // Your SMTP port
      secure: false, // True for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your email address
      subject: `${subject} - ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email. ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
  }
}
