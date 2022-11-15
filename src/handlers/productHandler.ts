import express, {Response, Request} from 'express';
import { Product, ProductStore } from '../models/products';
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const store = new ProductStore();

const index = async (_req:Request, res:Response) => {
    try {
        const products:Product[] = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const show = async (req:Request, res:Response) => {
    try {
        const productId = parseInt(req.params.id);
        const product:Product = await store.show(productId);
        res.json(product);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const create = async (req:Request, res:Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1];
        jwt.verify(token as string, process.env.SECRET_TOKEN as unknown as string);
    } catch (error) {
        res.status(401);
        res.json("Access denied Invalid token")
        return
    }

    try {
        const newProduct:Product = {
            product_name :req.body.product_name,
            price :req.body.price,
            category :req.body.category,
        }
        const product:Product = await store.create(newProduct);
        res.json(product);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const productRoutes = (app: express.Application): void => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
}
    
export default productRoutes;