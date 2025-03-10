import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body; // Added subject

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER2,
      subject: `New Contact Form Submission from ${name}`,
      html: `
            <table border="1" cellspacing="0" cellpadding="10" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td><b>Name</b></td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td><b>Email</b></td>
                    <td>${email}</td>
                </tr>
                <tr>
                    <td><b>Subject</b></td>
                    <td>${subject}</td> <!-- Fixed subject field -->
                </tr>
                <tr>
                    <td><b>Message</b></td>
                    <td>${message}</td>
                </tr>
            </table>
            `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email" });
  }
}
