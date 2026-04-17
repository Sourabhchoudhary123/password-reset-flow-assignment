import nodemailer from "nodemailer";

const sendEmail = async (email, link) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `Click here to reset password: ${link}`
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Send email error", error);
        throw error;
    }
};

export default sendEmail;