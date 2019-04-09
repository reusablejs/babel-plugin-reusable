import { reuseReducer } from "reusable";

const counter = () => {
  const [count, countDispatch] = reuseReducer((state, action) => state, {}, "count");
  const [users, usersDispatch] = reuseReducer((state, action) => state, undefined, "users");
  const authReducer = reuseReducer((state, action) => state, undefined, "authReducer");
};
