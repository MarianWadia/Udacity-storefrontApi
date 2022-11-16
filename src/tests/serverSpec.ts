import supertest from "supertest";
import { app } from "../server";


export const request = supertest(app);

describe("testing main route", ()=>{
    it("get the / endpoint", async ()=>{
        const response = await request.get('/');
        expect(response.statusCode).toBe(200);
    })
}
)