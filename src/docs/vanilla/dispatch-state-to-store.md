### Dispatch State to store

Like the `set` method the `dispatch` method dispatches to a specific store item. The difference is, this method can dispatch a mutator function and the mutator can be ran by the `onRun` middleware.

```javascript
Store.add({
  key: "trainer",
  state: "Ash Ketchum",
  features: {
    onRun: (payload) => {
      const data = payload.dispatchData;
      if (data.status === "Beat the Elite Four") {
        payload.state = `Pokemon Master Ash Ketchum`;
      } else {
        payload.cancelDispatch();
      }
    },
  },
});

Store.dispatch("trainer", (payload) => {
  payload.data = { status: "Lost agian..." };
});

Store.dispatch("trainer", (payload) => {
  payload.data = { status: "Beat the Elite Four" };
});
```
