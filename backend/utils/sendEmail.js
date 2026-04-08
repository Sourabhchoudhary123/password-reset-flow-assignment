import nodemailer from "nodemailer";

const sendEmail = async (email, link) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        await transporter.sendMail({
            from: '"Password Reset" <test@mail.com>',
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