import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv"

dotenv.config();

const {SALT_ROUNDS, PEPPER} = process.env;

export type User = {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't connect to the database and return users. Error: ${err}`
      );
    }
  }
  async show(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM users where user_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't connect to the database and return user with id ${id}. Error: ${err}`
      );
    }
  }
  async create(u: User): Promise<User> {
    try {
      const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS as unknown as string));
      const hashPassword = bcrypt.hashSync(u.password + PEPPER, salt)
      const connection = await Client.connect();
      const sql = `INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        u.email,
        hashPassword,
      ]);
      const user = result.rows[0];
      connection.release();
      return user;
    } catch (err) {
      throw new Error(
        `Couldn't connect to the database and create a new user. Error: ${err}`
      );
    }
  }
  async authenticate(signEmail: string, signPassword:string) :Promise<User | null | string>{
    const connection = await Client.connect();
    const sql = `SELECT * FROM users WHERE email = ($1)`;
    const result = await connection.query(sql, [signEmail]);
    if(result.rows.length){
      const signedUser = result.rows[0]
      if(bcrypt.compareSync(signPassword+PEPPER, signedUser.password)){
        return signedUser;
      }
      else{
        return `Incorrect password`
      }
    }
    return null
  }
}
