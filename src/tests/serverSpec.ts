import supertest from "supertest";
import { app } from "../server";
import Client from "../database";
import { User, UserStore } from "../models/users";
import { Product, ProductStore } from "../models/products";
import { OrderStore, Order} from "../models/orders";

const request = supertest(app);
let token = '';
const userInstance = new UserStore();

describe("testing main route", ()=>{
    it("get the / endpoint", async ()=>{
        const response = await request.get('/');
        expect(response.text).toEqual("Hello World!");
        expect(response.statusCode).toBe(200);
    })
})

describe("testing all routes", ()=>{
    afterAll(async () => {
        const conn = await Client.connect();
        const sql = `TRUNCATE users, products, orders, order_details RESTART identity;`
        await conn.query(sql);
        conn.release();
    })
    describe("testing user routes", () => {
        const user:User = {
            email: "test@gmail.com",
            first_name: "test1",
            last_name: "user",
            password: "test123",
        } 
        beforeAll(async () => {
            const responseData:User = await userInstance.create(user);
            user.user_id = responseData.user_id;
        });

        it("tests for authenticate route",async () => {
            const res = await request.post('/users/authenticate')
            .set('Content-type', 'application/json')
            .send({email: user.email, password: user.password});
            expect(res.statusCode).toBe(200);
            token = res.body;
        })
        it("tests for authenticate route if user not authorized",async () => {
            const res = await request.post('/users/authenticate')
            .set('Content-type', 'application/json')
            .send({email: "nadine.email@yahoo.com", password: "asw23"});
            expect(res.statusCode).toBe(401);
        })
        it("tests for get user route",async () => {
            const res = await request.get('/users')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
        })

        it("tests for create user route",async () => {
            const res = await request.post('/users')
            .set('Content-type', 'application/json')
            .send({
                first_name: "noura", 
                last_name: "ali", 
                email: "testuser2.email", 
                password: "user214", 
            });
            expect(res.statusCode).toBe(200);
        })
        it("tests for get user with an id route",async () => {
            const res = await request.get('/users/2')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
            expect(res.body.user_id).toEqual(2);
            expect(res.body.first_name).toEqual("test1");
            expect(res.body.last_name).toEqual("user");
            expect(res.body.email).toEqual("test@gmail.com");
            expect(res.statusCode).toBe(200);
        })
    })



    const productInstance = new ProductStore();

    describe("testing products routes", () => {
        const product:Product = {
            product_name: "hohos", 
            price: 8,
            category: "sweets",
        }     
        beforeAll(async () => {
            const responseData:Product = await productInstance.create(product);
            product.product_id = responseData.product_id;
        });
        it("tests for create product route",async () => {
            const res = await request.post('/products')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                product_name: "twinks", 
                price: 4,
                category: "sweets",
            });
            expect(res.statusCode).toBe(200);
        })
        it("tests for get products route",async () => {
            const res = await request.get('/products')
            .set('Content-type', 'application/json');
            console.log(res.body);
            expect(res.body.length).toEqual(3);
            expect(res.statusCode).toBe(200);
        })
        it("tests for get user with an id route",async () => {
            const res = await request.get('/products/2')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
            expect(res.body.product_name).toEqual("hohos");
            expect(res.body.price).toEqual(8);
            expect(res.body.category).toEqual("sweets");
            expect(res.body.product_id).toEqual(2);
            expect(res.statusCode).toBe(200);
        })
    })

    const orderInstance = new OrderStore();

    describe("testing orders routes", () => {
        const order:Order = {
            order_status: "completed",
            user_id: 1,
        }    
        beforeAll(async () => {
            const responseData:Order = await orderInstance.create(order);
            order.order_id = responseData.order_id;
        });
        it("tests for create order route",async () => {
            const res = await request.post('/orders')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user_id:2,
                order_status: "active",
            });
            expect(res.statusCode).toBe(200);
        })
        it("tests for get orders route",async () => {
            const res = await request.get('/orders')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
            console.log(res.body);
            expect(res.body.length).toEqual(3);
            expect(res.statusCode).toBe(200);
        })
        it("tests for get order with an order id route",async () => {
            const res = await request.get('/orders/3')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
            expect(res.body.order_status).toEqual("active");
            expect(res.body.user_id).toEqual(2);
            expect(res.body.order_id).toEqual(3);
            expect(res.statusCode).toBe(200);
        })
        it("tests add a product to a compeleted order",async () => {
            const res = await request.post('/orders/newproducts')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                order_quantity: 5,
                order_id: 2,
                produt_id: 2,
            });
            expect(res.statusCode).toBe(400);
        })
        it("tests add a product to an active order",async () => {
            const res = await request.post('/orders/newproducts')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                order_quantity: 5,
                order_id: 3,
                product_id: 2,
            });
            console.log(res.body);
            expect(res.body.id).toEqual(2);
            expect(res.body.order_quantity).toEqual(5);
            expect(res.body.order_id).toEqual(3);
            expect(res.body.product_id).toEqual(2);
            expect(res.statusCode).toBe(200);
        })
    })
})


