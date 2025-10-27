import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

// const router = express.Router();

// // POST: Save contact form
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "Name, Email, and Message are required" });
//     }

//     const newContact = new Contact({ name, email, phone, message });
//     await newContact.save();

//     res.status(201).json({ success: true, message: "Message saved successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { name, email, phone, message } = req.body;

//   try {
//     // 1. Setup transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     // 2. Define mail options
//     const mailOptions = {
//       from: email,
//       to: process.env.EMAIL_USER, // send to yourself
//       subject: "New Contact Form Submission",
//       text: `📩 New Contact Form Submission:
      
// Name: ${name}
// Email: ${email}
// Phone: ${phone}
// Message: ${message}`
//     };

//     // 3. Send email
//     await transporter.sendMail(mailOptions);

//     res.status(201).json({ success: true, message: "Message saved & email sent!" });
//   } catch (error) {
//     console.error("Email error:", error);
//     res.status(500).json({ success: false, message: "Failed to send email" });
//   }
// });

// export default router;
// howl jkmj gqsb rdaq;
//........................................................

// import express from "express";
// import nodemailer from "nodemailer";
// import Contact from "../models/Contact.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { name, email, phone, message } = req.body;

//   try {
//     // 1️⃣ Save to MongoDB
//     await Contact.create({ name, email, phone, message });

//     // 2️⃣ Setup Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // your Gmail
//         pass: process.env.EMAIL_PASS, // app password
//       },
//     });

//     // 3️⃣ Mail options with replyTo
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // your email
//       replyTo: email,               // user's email
//       to: process.env.EMAIL_USER,   // your inbox
//       subject: "New Contact Form Submission",
//       text: `
// 📩 New Contact Form Submission:

// Name: ${name}
// Email: ${email}
// Phone: ${phone}
// Message: ${message}
//       `,
//     };

//     // 4️⃣ Send the email
//     await transporter.sendMail(mailOptions);

//     res.status(201).json({
//       success: true,
//       message: "Message saved & email sent successfully!",
//     });
//   } catch (error) {
//     console.error("❌ Email error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//       error: error.message,
//     });
//   }
// });

// export default router;
//...............................................working, above and below also
// import express from "express";
// import nodemailer from "nodemailer";
// import Contact from "../models/Contact.js";

// //.............................................

// import express from "express";
// import nodemailer from "nodemailer";
// import Contact from "../models/Contact.js";

//..................................................nice coe below

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { name, email, phone, message } = req.body;

//   try {
//     // Save to MongoDB
//     await Contact.create({ name, email, phone, message });

//     // Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // your Gmail
//         pass: process.env.EMAIL_PASS, // Gmail App Password
//       },
//     });

//     // HTML email template
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       replyTo: email, // reply goes to form submitter
//       to: process.env.EMAIL_USER,
//       subject: "📩 New Contact Form Submission",
//       html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
//         <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
//           <h2 style="margin: 0;">New Contact Form Submission</h2>
//         </div>
//         <div style="padding: 20px; color: #333;">
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
//           <p><strong>Phone:</strong> ${phone}</p>
//           <p><strong>Message:</strong></p>
//           <p style="padding: 15px; background: #f2f2f2; border-radius: 5px;">${message}</p>
//         </div>
//         <div style="background: #f9f9f9; text-align: center; padding: 10px; color: #777; font-size: 12px;">
//           This email was generated automatically from your website contact form.
//         </div>
//       </div>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     res.status(201).json({
//       success: true,
//       message: "Message saved & email sent successfully!",
//     });
//   } catch (error) {
//     console.error("❌ Email error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//       error: error.message,
//     });
//   }
// });

// export default router;

//........................................
// import express from "express";
// import nodemailer from "nodemailer";
// import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // ✅ Save in database
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // ✅ Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Email to Service Center
    const serviceMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `📩 New Contact Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`,
    };

    // 📩 Auto-reply to User
    const autoReply = {
      from: process.env.EMAIL_USER,
      to: email, // send to user’s email
      subject: "Sai annapurna Car Wash",
      text: `Hello ${name || "User"},

Thanks for reaching out to us. We’ve received your message and our team will get back to you soon.

Your submitted details:
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Message: ${message}

Best regards,  
Customer Support Team`,
    };

    // ✅ Send both emails
    await transporter.sendMail(serviceMail);
    await transporter.sendMail(autoReply);

    res.status(201).json({ success: true, message: "Message saved, emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

export default router;

