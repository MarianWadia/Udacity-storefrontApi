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
const products_1 = require("../models/products");
const store = new products_1.ProductStore();
const item = {
    product_name: "cola",
    price: 80,
    category: "drinks",
};
describe("testing for product model methods if defined", () => {
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
describe("testing for product model methods results", () => {
    it("tests if create method return the created item", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create(item);
        expect(result).toEqual({
            product_id: 1,
            product_name: "cola",
            price: 80,
            category: "drinks",
        });
    }));
    it("tests if index method return products data", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                product_id: 1,
                product_name: "cola",
                price: 80,
                category: "drinks",
            },
        ]);
    }));
    it("tests if show method return specified product of provided id", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual({
            product_id: 1,
            product_name: "cola",
            price: 80,
            category: "drinks",
        });
    }));
});
