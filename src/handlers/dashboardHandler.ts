import express, { Response, Request} from 'express';
import { DashboardQueriesStore} from '../models/dashboardQueries';
import { Product } from '../models/products';
import verifyToken from "../middlewares/verifyToken"


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
        const user_id = parseInt(req.params.user_id);
        const orders = await store.showActive(user_id);
        res.json(orders);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}
const showCompleted = async (req:Request, res:Response) => {
    try {
        const user_id = parseInt(req.body.user_id);
        const orders = await store.showCompleted(user_id);
        console.log(orders);
        res.json(orders);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const dashboardRoutes = (app: express.Application): void => {
    app.get('/products/products-by-category/:category',verifyToken, indexOfCategory);
    app.get('/products/top-five-popular',verifyToken, topFivePopular);
    app.get('/orders/showactive/:id', verifyToken, showActive);
    app.get('/orders/showcompleted/:id', verifyToken, showCompleted);    
}
    
export default dashboardRoutes;