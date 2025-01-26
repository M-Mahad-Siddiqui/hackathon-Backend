import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})

export default transporter;
 
// x smtpsib - d40dd3d5b996f938f9bfd7678c0525c519c0954de8d2c97795bcc5cdec7f6971 - ThvYzcIE6A20VJgC