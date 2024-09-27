import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export default {
  dest: path.resolve(
    __dirname,
    '..',
    '..',
    'tmp',
    'attachments'
  ),
  storage: multer.diskStorage({
    // eslint-disable-next-line no-undef
    destination: (request: Express.Request, file: Express.Multer.File, fn: Function) => {
      fn(
        null,
        path.resolve(
          __dirname,
          '..',
          '..',
          'tmp',
          'attachments'
        )
      )
    },
    // eslint-disable-next-line no-undef
    filename: (request: Express.Request, file: Express.Multer.File, fn: Function) => {
      crypto.randomBytes(
        16,
        (error: Error | null, hash: Buffer) => {
          if (error) {
            fn(error)
          }

          const fileName = `${hash.toString('hex')}-${file.originalname}`

          fn(
            null,
            fileName
          )
        }
      )
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  // eslint-disable-next-line no-undef
  fileFilter: (request: Express.Request, file: Express.Multer.File, fn: Function) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/docx',
      'image/xlsx',
      'image/pptx',
      'image/pdf'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      fn(
        null,
        true
      )
    } else {
      fn(new Error('O tipo de arquivo enviado é inválido.'))
    }
  }
}
