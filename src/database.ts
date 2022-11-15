import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const {
  DATABASE_NAME,
  USER_NAME,
  DB_HOST,
  DB_PASSWORD,
  ENV,
  USER_NAME_TEST,
  DB_PASSWORD_TEST,
  DB_NAME_TEST,
  DB_PORT
} = process.env;

let Client = new Pool();

if ((ENV as string) === "dev") {
  Client = new Pool({
    host: DB_HOST,
    database: DATABASE_NAME,
    user: USER_NAME,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT as string, 10)
  });
}

if ((ENV as string) === "test") {
  Client = new Pool({
    host: DB_HOST,
    database: DB_NAME_TEST,
    password: DB_PASSWORD_TEST,
    user: USER_NAME_TEST,
    port: parseInt(DB_PORT as string, 10)
  });
}

export default Client;





// {
//   "dev": {
//       "driver": "pg",
//       "host": {
//           "ENV": "DB_HOST"
//       },
//       "database": {
//           "ENV": "DATABASE_NAME"
//       },
//       "user": {
//           "ENV": "USER_NAME"
//       },
//       "password": {
//           "ENV": "DB_PASSWORD"
//       }
//   },
//   "test": {
//       "driver": "pg",
//       "host": {
//           "ENV": "DB_HOST"
//       },
//       "database": {
//           "ENV": " DATABASE_NAME_TEST"
//       },
//       "user": {
//           "ENV": "USER_NAME_TEST"
//       },
//       "password": {
//           "ENV": "DB_PASSWORD_TEST"
//       }
//   }
// }
