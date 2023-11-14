import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().min(6).max(225).required(),
  phone: Joi.string().regex(/^\d{6,15}$/).required(),
  sex: Joi.string().required().email(),
  email: Joi.string().min(6).max(225).required().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
})

const findOnebyEmail = async (email) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: email })
    return result
  } catch (error) { throw new Error(error) }
}

const createNew = async (reqBody) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(reqBody.password, salt)

    const userValidate = {
      ...reqBody,
      password: hashPassword
    }

    const newUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(userValidate)

    return newUser
  } catch (error) { throw new Error(error) }
}

const getAllUser = async () => {
  try {
    const allUSer = await GET_DB().collection(USER_COLLECTION_NAME).find({}).toArray()

    return allUSer
  } catch (error) { throw new Error(error) }
}

const findUserAndUpdate = async (userID, reqBody) => {
  try {
    const updateUser = await GET_DB().collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(userID) },
        { $set: reqBody },
        { returnDocument: 'after' }
      )

    return updateUser
  } catch (error) { throw new Error(error) }
}

const findUserAndDelete = async (userID) => {
  try {
    const updateUser = await GET_DB().collection(USER_COLLECTION_NAME)
      .findOneAndDelete({ _id: new ObjectId(userID) })

    return updateUser
  } catch (error) { throw new Error(error) }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  findOnebyEmail,
  createNew,
  getAllUser,
  findUserAndUpdate,
  findUserAndDelete
}
