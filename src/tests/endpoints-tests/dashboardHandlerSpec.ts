import {app} from "../../server"
import supertest from "supertest"
import { CreatedOrder } from "../orderSpec";
import { createdItem } from "../productSpec";



const request = supertest(app);

describe("testing users endpoint",  () => {
    it("tests /products/products-by-category/:category request to get products with provided category", async () => {
        const response = await request.get('/products/products-by-category/drinks');
        expect(response.body.json).toBe([createdItem]);
        expect(response.statusCode).toBe(200)
    })
    it("tests /products/top-five-popular request to get users", async () => {
        const response = await request.get('/products/top-five-popular');
        expect(response.body.json).toBe([createdItem]);
        expect(response.statusCode).toBe(200)
    })
    it("tests /orders/:id/showactive to get current orders of that user with this its id", async () => {
        const response = await request.get('/orders/showactive/1');
        expect(response.body.json).toBe([CreatedOrder]);
        expect(response.statusCode).toBe(200)
    })
})