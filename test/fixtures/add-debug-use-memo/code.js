import { Memo, reuseReducer, reuseEffect } from "reusable";

export const todosUnit = Memo(() => {
  const [todos, dispatch] = reuseReducer(todosReducer, {});

  // fetch todos on start:
  reuseEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(todos => {
        const keyedTodos = keyBy(
          'id',
          take(5, todos)
        );
        dispatch({ type: SET_TODOS, payload: keyedTodos });
      });
  }, []);

  reuseEffect(() => {
    console.log('fake effect');
  })

  reuseEffect(() => {
    console.log('fake effect');
  }, undefined, 'FAKE_DEBUG_NAME EFFECT');

  // return object with action creators wrapped in dispatch:
  return {
    todos,
    addTodo: (title) => dispatch({
      type: 'ADD_TODO',
      payload: {
        id: uuid.v4(),
        title,
        completed: false
      }
    }),
    removeTodo: (id) => dispatch({ type: 'REMOVE_TODO', payload: { id } }),
    toggleTodo: (id) => dispatch({ type: 'TOGGLE_TODO', payload: { id } }),
    completeAll: () => dispatch({ type: 'COMPLETE_ALL' }),
    setAllIncomplete: () => dispatch({ type: 'SET_ALL_INCOMPLETE' }),
    clearCompleted: () => dispatch({ type: 'CLEAR_COMPLETED' })
  };
  // We only need to notify changes if todos changed.
  // Alternatively, we could wrap each action with reuseCallback and skip the second param to Memo
}, (prev, next) => prev.todos === next.todos);
