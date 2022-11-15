import express, {Response, Request} from 'express';
import { DashboardQueriesStore} from '../models/dashboardQueries';
import { Product } from '../models/products';
import { Order } from '../models/orders';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
const store = new DashboardQueriesStore();

const indexOfCategory = async (req:Request, res:Response) => {
    try {
        const category :string = req.params.category; 
        const products: Product[] = await store.indexOfCategory(category);
        res.json(products);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const topFivePopular = async (req:Request, res:Response) => {
    try {
        const popularProducts = await store.topFivePopular();
        res.json(popularProducts);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const showActive = async (req:Request, res:Response) => {
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
        const user_id = parseInt(req.params.user_id);
        const orders:Order[] = await store.showActive(user_id);
        res.json(orders);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}
const showCompleted = async (req:Request, res:Response) => {
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
        const user_id = parseInt(req.params.user_id);
        const orders:Order[] = await store.showCompleted(user_id);
        res.json(orders);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const dashboardRoutes = (app: express.Application): void => {
    app.get('/products/products-by-category/:category', indexOfCategory);
    app.get('/products/top-five-popular', topFivePopular);
    app.get('/orders/showactive/:id', showActive);
    app.get('/orders/showcompleted/:id', showCompleted);    
}
    
export default dashboardRoutes;