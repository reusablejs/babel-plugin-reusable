import { reusable } from 'reusable';
const useCounter = reusable(function useCounter() {
  const [count, setCount] = useState(0);
  const nullValue = useState();
  const [value, setValue] = useState(0, 'debugName');
  return {
    count,
    value
  };
});
const useStep = reusable(function useStep(id) {
  const [count, setCount] = useState(0);
  const nullValue = useState();
  const [value, setValue] = useState(0, 'debugName');
  return {
    count,
    value
  };
});
