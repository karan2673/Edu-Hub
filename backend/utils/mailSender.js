const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465, // or 587 if you are not using SSL/TLS
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER, // sender address
            to: email, // list of receivers
            subject: title, // Subject line
            html: body // html body
        });

        console.log('Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error while sending mail (mailSender) -', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = mailSender;
