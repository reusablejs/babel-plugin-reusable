import { reusable as dudu } from 'reusable';
const useCounter = dudu(function useCounter() {
  const [count, setCount] = useState(0);
  const nullValue = useState();
  const [value, setValue] = useState(0, 'debugName');
  return {
    count,
    value
  };
});
const useStep = dudu(function useStep(id) {
  const [count, setCount] = useState(0);
  const nullValue = useState();
  const [value, setValue] = useState(0, 'debugName');
  return {
    count,
    value
  };
});
