import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const userValidation = Joi.object({
    name: Joi.string().min(6).max(225).required(),
    phone: Joi.string().regex(/^\d{6,15}$/).required(),
    email: Joi.string().min(6).max(225).required().email(),
    sex: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
  })

  try {
    await userValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const login = async (req, res, next) => {
  const loginValidation = Joi.object({
    email: Joi.string().min(6).max(225).required().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
  })

  try {
    await loginValidation.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const userValidation = {
  createNew,
  login
}
