## Actions

Actions are custom dedicated methods to manipulate state in the store. They target the state that they are passed to.

The action prop on the `State` component takes a function that returns an object. The object properties are the state methods used to manipulate store state.

The function exposes a `dispatch` method that allows you to manipulate the `payload` within the action method. Payload `state` and `data` methods can be updated mutably. Example below.

```jsx
<State
  name={"count"}
  state={0}
  actions={(dispatch) => ({
    increment: () => {
      dispatch((payload) => {
        const current = payload.prevState;
        payload.state = current + 1;
      });
    },
    decrement: () => {
      dispatch((payload) => {
        const current = payload.prevState;
        payload.state = current - 1;
      });
    },
  })}
/>
```

The `useNeuron` hook returns a third parameter that gives you access to the action methods in the component it is called in. Example Below.

```jsx
function Comp(){

    const [count, setCount, { increment, decrement }] = useNeuron('count');

    return(
        <p>count: {count}</p>

        <button onClick={() => increment()}>Increment</button>
        <button onClick={() => decrement()}>decrement</button>
        <button onClick={() => setCount(100)}>100</button>
    );
}
```
