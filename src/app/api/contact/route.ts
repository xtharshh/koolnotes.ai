import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
    success?: boolean;
    error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        // Create a Nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com', // Your SMTP host
            port: 587, // Your SMTP port
            secure: false, // True for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        // Define the email options
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // Your email address
            subject: `${subject} - ${name}`,
            text: message,
        };

        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
