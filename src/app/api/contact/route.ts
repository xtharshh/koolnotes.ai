import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // True for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptionsForUser = {
      from: process.env.EMAIL_USER, // Your email address
      to: email,
      subject: `Confirmation: ${subject} - ${name}`,
      text: `Thank you for reaching out, ${name}!\n\nWe have received your message and will get back to you shortly.\n\nYour message:\n${message}`,
    };

    const mailOptionsForSelf = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email address
      subject: `${subject} - ${name}`,
      text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptionsForUser);
    await transporter.sendMail(mailOptionsForSelf);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email. ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
  }
}
