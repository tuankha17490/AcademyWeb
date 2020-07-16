import dotenv from "dotenv"
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import process from "process"
module.exports = {
  development: {
      client:  process.env.CLIENT,
      connection: {
        host: process.env.HOST,
        user: process.env.User,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
      },
      pool: { min: 0, max: 7 },
      debug: true,
      migrations: {
        directory: './app/Database/Migrations'
      },
      seeds: {
        directory: './app/Database/Seeds'
      }
  }
};

