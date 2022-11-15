"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DATABASE_NAME, USER_NAME, DB_HOST, DB_PASSWORD, ENV, USER_NAME_TEST, DB_PASSWORD_TEST, DB_NAME_TEST, DB_PORT } = process.env;
let Client = new pg_1.Pool();
if (ENV === "dev") {
    Client = new pg_1.Pool({
        host: DB_HOST,
        database: DATABASE_NAME,
        user: USER_NAME,
        password: DB_PASSWORD,
        port: parseInt(DB_PORT, 10)
    });
}
if (ENV === "test") {
    Client = new pg_1.Pool({
        host: DB_HOST,
        database: DB_NAME_TEST,
        password: DB_PASSWORD_TEST,
        user: USER_NAME_TEST,
        port: parseInt(DB_PORT, 10)
    });
}
exports.default = Client;
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
