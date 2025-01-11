const nodemailer = require('nodemailer');


const sendEmail = async (options) => {

    // create reusable transporter object using smtp transport
    // -- Configuration of transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

 // Prepare the email format
    const message = {
        from: `${process.env.SMTP_EMAIL}`,
        to: options.email,
        subject: options.subject,
        html: options.emailBody
    }


    // Send email using transporter
    const info = await transporter.sendMail(message);

    console.log('Message sent: ', info.messageId);

}


module.exports = sendEmail 