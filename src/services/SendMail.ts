import nodemailer from 'nodemailer'

export default class sendMail {
    async send (by: string | null, recipient: Array<string>, subject: string, content: string) {
        return await nodemailer.createTestAccount((err, account) => {
            if (err) {
                process.exit(1);
                throw err;
            }
            
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.PASSWORD_MAIL
                }
            })

            transporter.verify(function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("E-mail enviado com sucesso!");
                }
            })

            const from = by !== null ? by : process.env.USER_MAIL;

            transporter.sendMail({
                from: from,
                to: recipient,
                subject: subject,
                text: content
            }).then(info => {
                return info;
            }).catch(error => { error.message })
        })
    }
}