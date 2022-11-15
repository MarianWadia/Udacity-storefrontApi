import Client from "../database";

export type Product = {
  product_id?: number;
  product_name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM products`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't connect to the database and return products. Error: ${err}`
      );
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM products where product_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't connect to the database and return product with id ${id}. Error: ${err}`
      );
    }
  }
  async create(item: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO products(product_name, price, category) VALUES($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [
        item.product_name,
        item.price,
        item.category,
      ]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (err) {
      throw new Error(
        `Couldn't connect to the database and create a new product. Error: ${err}`
      );
    }
  }
  
}
