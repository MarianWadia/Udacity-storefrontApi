"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const store = new users_1.UserStore();
const userEntry = {
    first_name: "marianne",
    last_name: "Israel",
    email: "marianne@gmail.com",
    password: "sdmcksmcsodmcsoc2323ekwe-=12w"
};
describe("testing for user model methods if defined", () => {
    it("tests for having an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("tests for having an show method", () => {
        expect(store.show).toBeDefined();
    });
    it("tests for having an show method", () => {
        expect(store.create).toBeDefined();
    });
});
describe("testing for user model methods results", () => {
    it("tests if create method return the created item", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create(userEntry);
        expect(result).toEqual({
            user_id: 1,
            first_name: "marianne",
            last_name: "Israel",
            email: "marianne@gmail.com",
            password: "sdmcksmcsodmcsoc2323ekwe-=12w",
        });
    }));
    it("tests if index method return users data", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                user_id: 1,
                first_name: "marianne",
                last_name: "Israel",
                email: "marianne@gmail.com",
                password: "sdmcksmcsodmcsoc2323ekwe-=12w",
            },
        ]);
    }));
    it("tests if show method return specified user of provided id", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual({
            user_id: 1,
            first_name: "marianne",
            last_name: "Israel",
            email: "marianne@gmail.com",
            password: "sdmcksmcsodmcsoc2323ekwe-=12w",
        });
    }));
});
