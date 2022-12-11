const nodemailer = require('nodemailer');


class Email {
    constructor(port,host,username,password){
        this.username = username;
        this.password = password;
        this.port = port;
        this.host = host;
    }
   
    sendEmail = async (recev, title, message) => {
        let user = this.username;
        let pwd = this.password;

        // create transport
        let transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
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