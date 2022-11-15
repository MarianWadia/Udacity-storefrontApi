import { OrderStore, Order, Cart } from "../models/orders";
import { createdItem } from "./productSpec";
import { createdUser } from "./userSpec";

const store = new OrderStore();

export const CreatedOrder: Order = {
    order_id: 1,
    user_id: 1,
    order_status: 'active'
} 

export const CreatedCart:Cart = {
    id: 1,
    order_quantity: 3,
    order_id: 1,
    product_id: 1,
}

const newOrder: Order = {
    user_id: createdUser.user_id as number,
    order_status: 'active',
}

const newCart: Cart = {
    order_quantity: 3,
    order_id: CreatedOrder.order_id as number,
    product_id: createdItem.product_id as number
}

describe("testing for order model methods if defined", () => {
  it("tests for having an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("tests for having an show method", () => {
    expect(store.show).toBeDefined();
  });
  it("tests for having a create method", () => {
    expect(store.create).toBeDefined();
  });
});

describe("testing for Order model methods results", () => {
  it("tests if create method return the created order", async () => {
    const result: Order = await store.create(newOrder);
    expect(result).toEqual({
        order_id: 1,
        user_id: 1,
        order_status: 'active'
    });
  });
  it("tests if index method return orders data", async () => {
    const result: Order[] = await store.index();
    expect(result).toEqual([
      {
        order_id: 1,
        user_id: 1,
        order_status: 'active'
      },
    ]);
  });
  it("tests if show method return specified Order of provided id", async () => {
    const result: Order = await store.show(1);
    expect(result).toEqual({
        order_id: 1,
        user_id: 1,
        order_status: 'active'
    });
  });
  it("tests if addproduct method return the right data", async () => {
    const result: Cart = await store.addProduct(newCart);
    expect(result).toEqual({
        id: 1,
        order_quantity: 3,
        order_id: 1,
        product_id: 1,
    });
  });
});

