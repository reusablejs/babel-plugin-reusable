import { reuseRef } from "reusable";

const counter = () => {
  const refHolder = reuseRef();
  const refHolderWithInitialValue = reuseRef(5);
}
