import { DashboardQueriesStore } from "../models/dashboardQueries";
import { createdItem } from "./productSpec";
import { createdUser } from "./userSpec";
import { CreatedOrder, CreatedCart } from "./orderSpec";

const store = new DashboardQueriesStore();

describe("testing for dashboardQueries models", () => {
  it("tests for having a showActive method", () => {
    expect(store.showActive).toBeDefined();
  });
  it("tests for having a showCompleted method", () => {
    expect(store.showCompleted).toBeDefined();
  });
  it("tests for having a topFivePopular method", () => {
    expect(store.topFivePopular).toBeDefined();
  });
  it("tests for having a indexOfCategory method", () => {
    expect(store.indexOfCategory).toBeDefined();
  });
  it("tests indexofcategory method", async () => {
    const result = await store.indexOfCategory(createdItem.category);
    expect(result).toEqual([createdItem]);
  });
  it("tests showActive method", async () => {
    const result = await store.showActive(createdUser.user_id as number);
    expect(result).toEqual([
      {
        product_name: createdItem.product_name,
        order_quantity: CreatedCart.order_quantity,
        order_status: CreatedOrder.order_status,
        first_name: createdUser.first_name,
        price: createdItem.price,
        category: createdItem.category,
      },
    ]);
  });
  it("tests topfivepopular method", async () => {
    const result = await store.topFivePopular();
    expect(result).toEqual([
      {
        product_name: createdItem.product_name,
        order_quantity: CreatedCart.order_quantity,
      },
    ]);
  });
});
