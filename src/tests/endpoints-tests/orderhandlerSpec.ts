import {app} from "../../server"
import supertest from "supertest"
import { createdItem, item } from "../productSpec";


const request = supertest(app);

describe("testing products endpoint",  () => {
    it("tests /products post request to craete products", async () => {
        const response = await request.post('/products').send(item);
        expect(response.body.json).toBe(createdItem);
        expect(response.statusCode).toBe(200)
    })
    it("tests /products request to get products", async () => {
        const response = await request.get('/products');
        expect(response.body.json).toBe([createdItem]);
        expect(response.statusCode).toBe(200)
    })
    it("tests /products/:id to get user with this id", async () => {
        const response = await request.get('/products/1');
        expect(response.body.json).toBe(createdItem);
        expect(response.statusCode).toBe(200)
    })
})