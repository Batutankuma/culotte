const nodemailer = require('nodemailer');


class Email {
    sendEmail = async (recev, title, message) => {
        let user = process.env.USERNAME;
        let pwd = process.env.PASSWORD;

        // create transport
        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.PORT,
            secureConnection: false,// true for 465, false for other ports
            auth: {
                user: user, // generated ethereal user
                pass: pwd, // generated ethereal password
            },
        });

        // create model send email
        let info = await transporter.sendMail({
            from: `"BatutaJS 👻" ${user}`, // sender address
            to: recev, // list of receivers
            subject: title, // Subject line
            text: message, // plain text body
            html: `<b>${message}</b>`, // html body
        });
        info;
    }
}

module.exports = Email;