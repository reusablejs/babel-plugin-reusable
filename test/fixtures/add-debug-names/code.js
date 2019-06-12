import { createStore } from 'reusable';

const useCounter = createStore(() => {
  const [count, setCount] = useState(0);
  const nullValue = useState();
  const [value, setValue] = useState(0, 'debugName');

  return { count, value };
});

const useStep = createStore((id) => {
  const [count, setCount] = useState(0);
  const nullValue = useState();
  const [value, setValue] = useState(0, 'debugName');

  return { count, value };
});
