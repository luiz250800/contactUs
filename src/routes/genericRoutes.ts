import { Router } from 'express'
import GenericController from '../controllers/GenericController'
import multer from 'multer'
import multerConfig from '../config/multer'

const genericRoutes = Router()

genericRoutes.post(
  '/genericmailer/sendmail',
  multer(multerConfig).array(
    'files',
    2
  ),
  GenericController.sendMailGeneric
)

export default genericRoutes
