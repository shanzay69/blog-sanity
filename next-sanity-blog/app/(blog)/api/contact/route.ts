import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Ensure that all fields are provided
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Saray fields bharna zaroori hain!" }),
        { status: 400 }
      );
    }

    // Create transporter for sending email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,  // Email from env
        pass: process.env.CONTACT_PASSWORD,  // Password from env
      },
    });
    const mailOptions = {
        from: process.env.CONTACT_EMAIL, 
        replyTo: email, 
        to: process.env.RECEIVER_EMAIL, 
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };


    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return new Response(
      JSON.stringify({ success: "Message successfully bheja gaya!" }),
      { status: 200 }
    );
  } catch (error) {
    // Log the error and return failure response
    console.error("Email bhejne mein error:", error);
    return new Response(
      JSON.stringify({ error: "Kuch galat hua, dobara koshish karein." }),
      { status: 500 }
    );
  }
}
