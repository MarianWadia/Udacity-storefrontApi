import {app} from "../../server"
import supertest from "supertest"
import { UserStore, User } from "../../models/users";
import Client from "../../database";




const request = supertest(app);
const userModel = new UserStore();



describe("testing users endpoint",  () => {
    const userNewEntry :User = {
        first_name: "user2", 
        last_name: "test",
        email: "testemail@gmail.com",
        password: "testpass"
    }    
    beforeAll(async () =>{
        const createdUser: User = await userModel.create(userNewEntry);
        userNewEntry.user_id = createdUser.user_id;
    });
    afterAll(async ()=> {
        const conn = await Client.connect();
        const sql = `DELETE * FROM users`;
        await conn.query(sql);
        conn.release();
    })
    let token = '';
    it("tests /users/authenticate post route to authenticate user ", async () => {
        const response = await request.post('/users/authenticate').set('Content-type', 'application/json').send({email: userNewEntry.email , password: userNewEntry.password});
        const {token:userToken} = response.body.data
        expect(response.status).toBe(200)
        token = userToken;
    })
    it("tests /users post request to craete users", async () => {
        const response = await request.post('/users').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send({
            first_name: "user3", 
            last_name: "test",
            email: "test3email@gmail.com",
            password: "testpass154"
        });
        const {first_name, last_name, email} = response.body.data
        expect(first_name).toBe("user3");
        expect(last_name).toBe("test");
        expect(email).toBe("test3email@gmail.com");
        expect(response.status).toBe(200)
    })
    it("tests /users request to get users", async () => {
        const response = await request.get('/users').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
        expect(response.body.data.length).toEqual(2);
        expect(response.status).toBe(200)
    })
    it("tests /users/:id to get user with this id", async () => {
        const response = await request.get(`/users/${userNewEntry.user_id as number}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
        expect(response.body.data).toBe(userNewEntry);
        expect(response.status).toBe(200)
    })
})