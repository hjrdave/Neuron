# Listen for State Changes

In Vanilla Neuron state is not reactive out of the box as is in JS frameworks/libraries like Svelte or React. It is up to the developer to make your state reactive. Neuron has a special method called `onDispatch`. This method runs every time the store is updated. It returns an updated `payload` object with state data every time it runs. You can run specific logic based on the payload `key` or other data.

```javascript
Store.onDispatch((payload) => {
  if (payload.key === "pokemon") {
    console.log(payload.state);
  }
});
//name: Pikachu

Store.onDispatch((payload) => {
  if (payload.key === "trainer") {
    console.log(payload.state);
  }
});
//name: Ash Ketchum
```

The `onDispatch` method can be used to connect Neuron stores to native state solutions in other JS frameworks. It is the reason Neuron is an "agnostic" global state manager.
