import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { userRoute } from '~/routes/v1/userRoute'

const ROUTE = express.Router()

/* Check API /v1/status */
ROUTE.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs v1 already to use' })
})

// Authentication
ROUTE.use('/auth', userRoute)

// User Route
ROUTE.use('/user', userRoute)

export const APIs_V1 = ROUTE
