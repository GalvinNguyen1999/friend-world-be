import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import { userService } from '~/services/userService'

const createNew = async (req, res) => {
  try {
    const newUser = await userService.createNew(req.body)

    return res.status(StatusCodes.OK).json(newUser)
  } catch (error) { throw new Error(error) }
}

const login = async (req, res) => {
  try {
    const user = await userService.login(req.body)

    if (!user) return res.status(StatusCodes.BAD_REQUEST).send('Email or Password is not correct')

    const checkPassword = await bcrypt.compare(req.body.password, user.password)

    if (!checkPassword) return res.status(StatusCodes.BAD_REQUEST).send('Email or Password is not correct')

    return res.status(StatusCodes.OK).json(user)
  } catch (error) { throw new Error(error) }
}

const getAllUser = async (req, res) => {
  try {
    const getAllUser = await userService.getAllUser()

    return res.status(StatusCodes.OK).json(getAllUser)
  } catch (error) { throw new Error(error) }
}

const updateUser = async (req, res) => {
  try {
    const updateUser = await userService.updateUser(req.params.userId, req.body)

    return res.status(StatusCodes.OK).json(updateUser)
  } catch (error) { throw new Error(error) }
}
const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.userId)

    return res.status(StatusCodes.OK).json(user)
  } catch (error) { throw new Error(error) }
}


export const userController = {
  login,
  createNew,
  getAllUser,
  updateUser,
  deleteUser
}
