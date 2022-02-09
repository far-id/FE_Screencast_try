import { atom } from "recoil";

const authenticatedUser = atom({
  key: "authenticatedUser",
  default: {
    user: [],
    isAuthenticated: false,
  },
});

const cartsStore = atom({
  key: "cartsStore",
  default: [],
});

export { authenticatedUser, cartsStore };