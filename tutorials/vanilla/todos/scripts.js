window.onload = () => {
  //instantiate Neuron Store
  const Store = window.Neuron.createStore();

  //Add todoForm store item
  Store.add({
    key: "todoForm",
    state: { id: "", title: "", description: "" },
    actions: (dispatch) => ({
      updateTitle: (title) =>
        dispatch((payload) => {
          payload.state = payload.prevState;
          payload.state.title = title;
        }),
      updateDescription: (description) =>
        dispatch((payload) => {
          payload.state = payload.prevState;
          payload.state.description = description;
        }),
      resetForm: () =>
        dispatch((payload) => {
          payload.state = payload.prevState;
          payload.state.id = "";
          payload.state.title = "";
          payload.state.description = "";
        }),
    }),
  });

  //Add todo list store item
  Store.add({
    key: "todos",
    state: [],
    actions: (dispatch) => ({
      removeTodo: (id) =>
        dispatch((payload) => {
          payload.state = payload.prevState.filter((todo) => todo.id !== id);
        }),
      addTodo: (todo) =>
        dispatch((payload) => {
          const id = crypto.randomUUID().slice(0, 5);
          const newTodo = { ...todo, id: id };
          payload.state = [...payload.prevState];
          payload.state.push(newTodo);
        }),
    }),
  });

  //Store actions
  const todoFormActions = Store.getActions("todoForm");
  const todoActions = Store.getActions("todos");

  //Bind event handlers to html nodes
  const todoFormBtn = document.querySelector("#addTodoButton");
  const titleControl = document.querySelector("#titleControl");
  const descriptionControl = document.querySelector("#descriptionControl");
  titleControl.addEventListener("change", (e) => {
    todoFormActions.updateTitle(e.target.value);
  });
  descriptionControl.addEventListener("change", (e) =>
    todoFormActions.updateDescription(e.target.value)
  );
  todoFormBtn.addEventListener("click", () => {
    const newTodo = Store.get("todoForm");
    todoActions.addTodo(newTodo);
    todoFormActions.resetForm();
    titleControl.value = "";
    descriptionControl.value = "";
  });

  //Initial render of todos on page load
  renderTodos(Store.get("todos"));

  //Listen to store changes and re render todos
  Store.onDispatch((payload) => {
    if (payload.key === "todos") {
      renderTodos(payload.state);
    }
  });

  //renders todos in todoContainer
  function renderTodos(todos) {
    const todoContainer = document.querySelector(".todoContainer");
    todoContainer.innerHTML = todos
      .map(
        (todo) => `
      <div class="todoCard">
      <small><strong>id:</strong> ${todo.id}</small>
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <button id="removeBtn_${todo.id}">Remove</button>
      </div>
      `
      )
      .join("");
    //add event handlers to each card remove button
    todos.map((todo) => {
      const removeBtn = document.querySelector(`#removeBtn_${todo.id}`);
      removeBtn.addEventListener("click", () =>
        todoActions.removeTodo(todo.id)
      );
    });
  }
};
