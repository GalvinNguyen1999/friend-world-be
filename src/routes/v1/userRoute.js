import express from 'express'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'
import { verifyToken } from '~/middlewares/verifyToken'

const Route = express.Router()

// Authentication
Route.route('/register')
  .post(userValidation.createNew, userController.createNew)

Route.route('/login')
  .post(userValidation.login, userController.login)

// Get All User
Route.route('/all')
  .get(verifyToken, userController.getAllUser)

// Update User
Route.route('/:userId')
  .put(userController.updateUser)
  .delete(userController.deleteUser)

export const userRoute = Route
