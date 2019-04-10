import { reuseRef } from "reusable";

const counter = () => {
  const refHolder = reuseRef(undefined, "refHolder");
  const refHolderWithInitialValue = reuseRef(5, "refHolderWithInitialValue");
};
