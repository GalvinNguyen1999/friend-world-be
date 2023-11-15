import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header('auth-token')

    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send('Access Denied')

    const verified = jwt.verify(token, env.TOKEN_SECRET)

    req.user = verified

    next()
  } catch (error) { throw new Error(error)}
}
