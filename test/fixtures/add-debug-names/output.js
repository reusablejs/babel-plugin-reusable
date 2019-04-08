import { reuseState, reuseMemo as memo } from "reusable";

const counter = () => {
  const [count, setCount] = reuseState(0, 'count');
  const nullValue = reuseState(undefined, 'nullValue');
  const [value, setValue] = reuseState(0, 'debugName');

  const likes = memo(() => {
    return count + 1000;
  }, [count], 'likes');

  const retweets = memo(() => {
    return 1000;
  }, undefined, 'retweets')
}
