import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let friendWorldDatabaseInstance = null

const mongodbClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongodbClientInstance.connect()
  friendWorldDatabaseInstance = mongodbClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await mongodbClientInstance.close()
}

export const GET_DB = () => {
  if (!friendWorldDatabaseInstance) throw Error ('Must connect to database first!')
  return friendWorldDatabaseInstance
}
