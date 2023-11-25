
import nodemailer from "nodemailer";

async function sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SEND_EMAIL,
            pass: process.env.SEND_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: `Mujahed - Shop" <${process.env.SEND_EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
    
}


export default sendEmail;