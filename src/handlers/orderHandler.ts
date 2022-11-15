import express, {Response, Request} from 'express';
import { Order, OrderStore, Cart} from '../models/orders';

const store = new OrderStore();

const index = async (_req:Request, res:Response) => {
    try {
        const orders:Order[] = await store.index();
        res.json(orders);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const show = async (req:Request, res:Response) => {
    try {
        const orderId = parseInt(req.params.id);
        const order:Order = await store.show(orderId);
        res.json(order);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const create = async (req:Request, res:Response) => {
    try {
        const newOrder:Order = {
            user_id: req.body.user_id,
            order_status: req.body.order_status,
        }
        const order:Order = await store.create(newOrder);
        res.json(order);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addProduct = async (req:Request, res:Response) => {
    try {
        const newOrderProduct: Cart = {
            order_quantity: req.body.order_quantity,
            order_id: parseInt(req.body.order_id),
            product_id: req.body.product_id
        }
        const editedOrder:Cart = await store.addProduct(newOrderProduct);
        res.json(editedOrder);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}
const orderRoutes = (app: express.Application): void => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.post('/orders/newproducts', addProduct)
}
    
export default orderRoutes;