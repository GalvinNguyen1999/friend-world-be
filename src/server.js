/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello Cuong Nguyen, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }`)
  })

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  exitHook(() => CLOSE_DB())
}

CONNECT_DB()
  .then(() => console.log('Connected to Mongodb Cloud Atlas'))
  .then(() => START_SERVER())
  .catch((error) => {
    console.error(error)
    process.exit(0)
  })
