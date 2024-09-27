import { typeFiles } from './../templateTypes/typeFiles'
import { attachmentsMail } from '../templateTypes/typeSendMail'
import fs from 'fs'

export default class Utils {
  public static filesToAttachments (files: any): attachmentsMail {
    return files?.map((file: typeFiles) => ({
      filename: file.filename.substr(33),
      path: file.path
    }))
  }

  public static cleanAttachments (files: any): void {
    files?.forEach((file: typeFiles) => {
      fs.unlinkSync(file.path)
    })
  }
}
