import { UserStore, User } from "../models/users";


const store = new UserStore();

export const createdUser: User = {
  user_id: 1,
  first_name: "marianne",
  last_name: "Israel",
  email: "marianne@gmail.com",
  password: "sdmcksmcsodmcsoc2323ekwe-=12w",
}


export const userEntry: User = {
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
  it("tests if create method return the created item", async () => {
    const result: User = await store.create(userEntry);
    expect(result.user_id).toEqual(1);
    expect(result.first_name).toEqual(userEntry.first_name);
    expect(result.last_name).toEqual(userEntry.last_name);
    expect(result.email).toEqual(userEntry.email);
  });
  it("tests if index method return users data", async () => {
    const result: User[] = await store.index();
    expect(result[0].user_id).toEqual(1);
    expect(result[0].first_name).toEqual(userEntry.first_name);
    expect(result[0].last_name).toEqual(userEntry.last_name);
    expect(result[0].email).toEqual(userEntry.email);;
  });
  it("tests if show method return specified user of provided id", async () => {
    const result = await store.show(1);
    expect(result.user_id).toEqual(1);
    expect(result.first_name).toEqual(userEntry.first_name);
    expect(result.last_name).toEqual(userEntry.last_name);
    expect(result.email).toEqual(userEntry.email);
  });
  it("tests if show method return specified user of provided id", async () => {
    const result = await store.authenticate(userEntry.email, userEntry.password);
      expect((result as User).user_id).toEqual(1);
      expect((result as User).first_name).toEqual(userEntry.first_name);
      expect((result as User).last_name).toEqual(userEntry.last_name);
      expect((result as User).email).toEqual(userEntry.email);
  });
});
