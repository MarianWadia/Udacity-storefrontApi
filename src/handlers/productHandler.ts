import express, {Response, Request} from 'express';
import { Product, ProductStore } from '../models/products';
import verifyToken from "../middlewares/verifyToken"



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
    app.get('/products/:id', verifyToken, show);
    app.post('/products', verifyToken,  create);
}
    
export default productRoutes;