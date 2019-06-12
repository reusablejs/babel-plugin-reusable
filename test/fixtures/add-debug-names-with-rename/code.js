import { createStore as dudu } from 'reusable';

const useCounter = dudu(() => {
  const [count, setCount] = useState(0);
  const nullValue = useState();
  const [value, setValue] = useState(0, 'debugName');

  return { count, value };
});

const useStep = dudu((id) => {
  const [count, setCount] = useState(0);
  const nullValue = useState();
  const [value, setValue] = useState(0, 'debugName');

  return { count, value };
});
