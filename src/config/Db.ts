import path = require('path');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

mongoose.Promise = global.Promise;
dotenv.config({
  path: path.join(process.cwd(), `.env`)
});

const { DB_URL } = process.env;

/**
 * Db setup
 * Initialize db
 */
const initDb = async (): Promise<void> => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  if (!DB_URL) {
    logger.error(
      "'Define the DB_URL environment variable inside .env to continue!'"
    );
    throw new Error(
      'Define the DB_URL environment variable inside .env to continue!'
    );
  }

  await mongoose.connect(DB_URL, options);
};

export default initDb;
