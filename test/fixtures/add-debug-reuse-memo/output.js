import { reuseMemo } from "reusable";

const counter = () => {
  reuseMemo(() => {}, [], "counter reuseMemo (0)");
  const MemoTest = reuseMemo(() => {}, [], "MemoTest");
};
