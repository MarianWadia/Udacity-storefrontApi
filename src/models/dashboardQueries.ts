import Client from "../database";
import {Product} from "./products"
import { Order } from "./orders";

export class DashboardQueriesStore {
    async indexOfCategory(category: string): Promise<Product[]> {
        try {
          const connection = await Client.connect();
          const sql = `SELECT * FROM products WHERE category=($1)`;
          const result = await connection.query(sql, [category]);
          connection.release();
          return result.rows;
        } catch (err) {
          throw new Error(
            `Couldn't connect to the database and return products with category ${category}. Error: ${err}`
          );
        }
      }

      async topFivePopular(): Promise<{product_name: string, order_quantity: number}[]> {
        try {
          const connection = await Client.connect();
          const sql = `SELECT product_name, order_quantity FROM products JOIN order_details ON products.product_id = order_details.product_id ORDER BY order_quantity DESC LIMIT 5`;
          const result = await connection.query(sql);
          connection.release();
          return result.rows;
        } catch (err) {
          throw new Error(
            `Couldn't connect to the database and return products with category. Error: ${err}`
          );
        }
      }
      
      async showActive(user_id:number): Promise<Order[]> {
        try {
            const connection = await Client.connect();
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND order_status='active'`;
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Couldn't connect to the database and return your active orders relatred to your ${user_id}. Error: ${error}`
              );
        }
    }

    async showCompleted(user_id:number): Promise<Order[]> {
        try {
            const connection = await Client.connect();
            const sql = `SELECT * FROM orders WHERE order_id=($1) AND order_status='active'`;
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Couldn't connect to the database and return your completed orders relatred to your ${user_id}. Error: ${error}`
              );
        }
    }
}

