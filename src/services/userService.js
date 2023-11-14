import { userModel } from '~/models/userModel'

// Authentication
const login = async (reqBody) => {
  try {
    const user = await userModel.findOnebyEmail(reqBody.email)

    return user
  } catch (error) { throw new Error(error) }
}

const createNew = async (reqBody) => {
  try {
    const newUser = await userModel.createNew(reqBody)
    return newUser
  } catch (error) { throw new Error(error) }
}

// GET All User
const getAllUser = async () => {
  try {
    const allUser = await userModel.getAllUser()

    return allUser
  } catch (error) { throw new Error(error) }
}

// Update User
const updateUser = async (userID, redBody) => {
  try {
    const updateUser = await userModel.findUserAndUpdate(userID, redBody)

    return updateUser
  } catch (error) { throw new Error(error) }
}

const deleteUser = async (userID) => {
  try {
    const deleteUser = await userModel.findUserAndDelete(userID)

    return deleteUser
  } catch (error) { throw new Error(error) }
}

export const userService = {
  login,
  createNew,
  getAllUser,
  updateUser,
  deleteUser
}
