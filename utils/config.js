import dotenv from 'dotenv';
dotenv.config();

let PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

export { MONGODB_URI, PORT }