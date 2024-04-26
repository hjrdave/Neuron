window.onload = () => {
  const Store = window.Neuron.createStore();

  Store.add({
    key: "todoForm",
    state: { title: "", description: "" },
    actions: (dispatch) => ({
      updateTitle: (title) =>
        dispatch((payload) => {
          payload.state.title = title;
        }),
      updateDescription: (description) =>
        dispatch((payload) => {
          payload.state.description = description;
        }),
      resetForm: (dispatch) =>
        dispatch((payload) => {
          payload.state.title = "";
          payload.state.description = "";
        }),
    }),
  });

  const defaultTodoState = [
    {
      id: crypto.getRandomValues(new Uint32Array(5))[0],
      title: "Todo 1",
      description: "This is the first todo",
    },
    {
      id: crypto.getRandomValues(new Uint32Array(5))[0],
      title: "Todo 2",
      description: "This is the second todo",
    },
    {
      id: crypto.getRandomValues(new Uint32Array(5))[0],
      title: "Todo 3",
      description: "This is the third todo",
    },
  ];

  Store.add({
    key: "todos",
    state: defaultTodoState,
    actions: (dispatch) => ({
      removeTodo: (id) =>
        dispatch((payload) => {
          payload.state.filter((todo) => todo.id !== id);
        }),
    }),
  });

  function renderTodos(todos) {
    const todoContainer = document.querySelector(".todoContainer");
    todoContainer.innerHTML = todos
      .map(
        (todo) => `
      <div class="todoCard">
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <button>Remove</button>
      </div>
  `
      )
      .join("");
  }
  renderTodos(Store.get("todos"));
};
