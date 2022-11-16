import { ProductStore, Product } from "../models/products";

const store = new ProductStore();

export const createdItem: Product = {
  product_id: 1 as number,
  product_name: "cola",
  price: 80,
  category: "drinks",
};

export const item: Product = {
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
  it("tests if create method return the created item", async () => {
    const result: Product = await store.create(item);
    expect(result).toEqual({
      product_id: 1,
      product_name: "cola",
      price: 80,
      category: "drinks",
    });
  });
  it("tests if index method return products data", async () => {
    const result: Product[] = await store.index();
    expect(result).toEqual([
      {
        product_id: 1,
        product_name: "cola",
        price: 80,
        category: "drinks",
      },
    ]);
  });
  it("tests if show method return specified product of provided id", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      product_id: 1,
      product_name: "cola",
      price: 80,
      category: "drinks",
    });
  });
});
