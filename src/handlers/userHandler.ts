import express, {Response, Request} from 'express';
import { User, UserStore } from '../models/users';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const store = new UserStore();

const index = async (req:Request, res:Response) => {
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
        const users:User[] = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const show = async (req:Request, res:Response) => {
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
        const UserId = parseInt(req.params.id);
        const User:User = await store.show(UserId);
        res.json(User);
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const create = async (req:Request, res:Response) => {
    try {
        const newUser:User = {
            first_name :req.body.first_name,
            last_name :req.body.last_name,
            email :req.body.email,
            password: req.body.password
        }
        const user: User = await store.create(newUser);
        const token = jwt.sign({newUser: user}, process.env.SECRET_TOKEN as unknown as string);
        res.json(token);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const authenticate = async (req:Request, res:Response) => {
    try {
        const email= req.body.email ;
        const password =  req.body.password;
        const signedUser = await store.authenticate(email,password);
        const token = jwt.sign({email: (signedUser as User).email, password: (signedUser as User).password}, process.env.SECRET_TOKEN as unknown as string);
        res.json(token);
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

const userRoutes = (app: express.Application): void => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.post('/users/authenticate', authenticate);
}
    
export default userRoutes;