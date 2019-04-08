import { reuseState, reuseMemo as memo } from "reusable";

const counter = () => {
  const [count, setCount] = reuseState(0);
  const nullValue = reuseState();
  const [value, setValue] = reuseState(0, 'debugName');

  const likes = memo(() => {
    return count + 1000;
  }, [count]);

  const retweets = memo(() => {
    return 1000;
  })
}
