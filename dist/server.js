"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const address = "0.0.0.0:5000";
app.use(body_parser_1.default.json());
database_1.default.connect().then(Client => {
    return Client
        .query('SELECT NOW()')
        .then((res) => {
        Client.release();
        console.log(res.rows);
    }).catch((error) => {
        Client.release();
        console.log(error);
    });
});
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(5000, function () {
    console.log(`starting app on: ${address}`);
});
