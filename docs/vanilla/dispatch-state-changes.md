# Dispatch State Changes

Like the `set` method the `dispatch` method dispatches to a specific store item. The difference is, this method can dispatch a mutator function and the mutator can be ran by the `onRun` middleware, to be processed.

You can send data to store item middleware via the dispatch mutator function. Example below.

```javascript
Store.dispatch("trainer", (payload) => {
  payload.data = { status: "Lost agian..." };
});

Store.dispatch("trainer", (payload) => {
  payload.data = { status: "Beat the Elite Four" };
});
```

The store middleware will then intercept this dispatch data and can process it as needed.

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
```

Note - This is an advance state management solution and should only be used when the `set` method is not sufficient to handle state management needs.
