import nodemailer from "nodemailer";

const sendEmail = async(email,link)=>{
 const transporter = nodemailer.createTransport({

  service:"gmail",
    
  auth:{
   user:process.env.EMAIL_USER,
   pass:process.env.EMAIL_PASSWORD,
  }

 });

 await transporter.sendMail({

  from:process.env.EMAIL_USER,
  to:email,
  subject:"Password Reset",
  text:`Click here to reset password: ${link}`

 });

};

export default sendEmail;