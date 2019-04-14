import { reuseMemo } from "reusable";

const counter = () => {
  reuseMemo(() => {}, [], "counter Effect (0)");
  const MemoTest = reuseMemo(() => {}, [], "MemoTest");
};
