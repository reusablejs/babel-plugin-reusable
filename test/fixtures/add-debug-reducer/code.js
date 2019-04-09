import { reuseReducer } from "reusable";

const counter = () => {
  const [ count, countDispatch ] = reuseReducer((state, action) => state, {});
  const [ users, usersDispatch ] = reuseReducer((state, action) => state);
  const authReducer = reuseReducer((state, action) => state);
}
