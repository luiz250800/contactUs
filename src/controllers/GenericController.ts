import { Request, Response } from 'express'
import { attachmentsMail, typeSendMail } from '../templateTypes/typeSendMail'
import TemplateMail from '../config/TemplateMail'
import SendMail from '../services/SendMail'
import Utils from '../helpers/Utils'

export default class GenericController {
  public static async sendMailGeneric (request: Request, response: Response): Promise<Response> {
    try {
      const sendMail = new SendMail()

      const data: typeSendMail = request.body

      const attachments: attachmentsMail = Utils.filesToAttachments(request.files)

      const templateMail = await TemplateMail.generateTemplateMail(data)

      const recipients = [process.env.USER_MAIL] as Array<string>

      await sendMail.send(
        data.by,
        recipients,
          `Solicitação de contato: ${data.name}`,
          templateMail,
          attachments
      )

      return response.status(200).json({ message: 'E-mail enviado com sucesso!' })
    } catch (error: any) {
      console.log(`Erro ao enviar e-mail: ${error}`)
      return response.status(500).json({ message: 'Erro ao enviar e-mail.' })
    } finally {
      Utils.cleanAttachments(request.files)
    }
  }
}
