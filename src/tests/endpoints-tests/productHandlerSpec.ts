import {app} from "../../server"
import supertest from "supertest"
// import { User } from "../../models/users";
// import { CreatedCart } from "../orderSpec";
// import { CreatedOrder } from "../orderSpec";
import { createdItem, item } from "../productSpec";
// import { userEntry, createdUser } from "../userSpec";



const request = supertest(app);

describe("testing users endpoint",  () => {
    it("tests /users post request to craete users", async () => {
        const response = await request.post('/products').send(item);
        expect(response.body.json).toBe([createdItem]);
        expect(response.statusCode).toBe(200)
    })
    it("tests /users request to get users", async () => {
        const response = await request.get('/products');
        expect(response.body.json).toBe([createdItem]);
        expect(response.statusCode).toBe(200)
    })
    it("tests /users/:id to get user with this id", async () => {
        const response = await request.get('/products/1');
        expect(response.body.json).toBe(createdItem);
        expect(response.statusCode).toBe(200)
    })
})