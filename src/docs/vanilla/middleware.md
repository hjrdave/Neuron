### Set Custom Middleware

Middleware can be applied to each individual Store Item's `add` method. There are three middleware types.

- `onLoad` - Runs only once when the `add` method fires.
- `onRun` - Runs every time a `set` is called.
- `onCallback` - Runs after the store is updated. This will run even if dispatch fails.

Each of these methods have access to the `payload` object. You can manipulate dispatch data with this.

**Payload properties and methods:**

- `key` - Store item key.
- `prevState` - Previous state.
- `state` - Writable property that holds the state that will be saved to the store.
- `data` - Writable property that holds a custom object that can be passed to middleware to make advanced state calculations.
- `features` - Features set for the store item. (examples: `onLoad`, `onRun`, `onCallback`, and module specific props passed to the `features` property in the `add` method).
- `cancelDispatch` - Method that allows for dispatch to be cancelled.
- `isDispatchCancelled` - Method that returns the status of the dispatch.
- `get` - Method that gets state from a store item by key.
- `set` - Method that sets state of a store item by key.
- `reset` - Method that resets store item to it's initial state by key. **Note: If no key is passed then it will reset all store items to initial.** state.

```javascript
const Store = Neuron.Store();

Store.add({
  key: "trainer",
  state: "Ash Ketchum",
  features: {
    onLoad: (payload) => {
      console.log("I only run once when the add method is first set");
    },
    onRun: (payload) => {
      console.log("I run everytime a set method is fired");
    },
    onCallback: (payload) => {
      console.log(
        "I only run after store is saved to state or the dispatch is cancelled."
      );
    },
  },
});
```
