import { reuseMemo } from "reusable";

const counter = () => {
  reuseMemo(() => {

  }, []);

  const MemoTest = reuseMemo(() => {

  }, []);
}
