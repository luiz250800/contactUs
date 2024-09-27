import nodemailer, { SentMessageInfo } from 'nodemailer'
import { attachmentsMail } from '../templateTypes/typeSendMail'

export default class sendMail {
  public async send (by: string | null, recipients: Array<string>, subject: string, content: string, attachments: attachmentsMail | undefined): Promise<SentMessageInfo> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASSWORD_MAIL
        }
      })

      transporter.verify((error) => {
        if (error) {
          return console.log(`Erro ao verificar transporte de e-mail: ${error}`)
        }
      })

      const from = by !== null
        ? by
        : process.env.USER_MAIL

      return await transporter.sendMail({
        from,
        to: recipients,
        subject,
        html: content,
        attachments
      })
    } catch (error) {
      console.log(`Erro Nodemailer ao enviar e-mail: ${error}`)
    }
  }
}
