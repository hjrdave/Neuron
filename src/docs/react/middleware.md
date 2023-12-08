## Middleware

Middleware is logic that runs at different times during the store dispatch process. This allows for state to be manipulated, interrigated, logged, and even cancelled during a dispatch. Middleware is set on a store item. Any time the store item gets a dispatch, the appropriate middleware will run. And example middleware is below:

```jsx
<State
  name={"fruit"}
  state={"apple"}
  onRun={(payload) => {
    console.log("The dispatched state is: ", payload.state);
  }}
/>
```

### Types

All three types of middleware have access to the `payload` object. This object has properties and methods that allow the middleware to interogate, manipulate, or cancel the dispatch. You may use all three types on one store item.

#### OnLoad

This only fires once as the store is instantiated. It will not run again, even if a dispatch happens.

```jsx
<State
  name={"fruit"}
  state={"apple"}
  onLoad={(payload) => {
    console.log("I fire only once when the store first instantiates");
  }}
/>
```

#### OnRun

This fires every time a dispatch is sent. When this middleware resolves, the dispatch will also resolve and the store will be updated.

```jsx
<State
  name={"fruit"}
  state={"apple"}
  onRun={(payload) => {
    if (payload.state === "lemon") {
      console.log("Gross, I hate lemons!");
      payload.cancelDispatch();
    } else {
      console.log("I love ", payload.state);
    }
  }}
/>
```

#### OnCallback

This fires only when all other middleware and the dispatch resolves. This will fire even if a dispatch is cancelled.

```jsx
<State
  name={"fruit"}
  state={"apple"}
  onCallback={(payload) => {
    console.log("The store has been updated....");
  }}
/>
```

#### Payload

The payload object is used by middleware to manipulate the dispatch process. Below is the list of methods and properties that are available in each payload.

- `key` - This is the name of the store item the dispatch is targeting.
- `prevState` - Previous state.
- `state` - A writable property that will be the next state.
- `data` - A writable property that can be used by `useDispatch` to send non state data to store middleware.
- `features` - Features set for the store item. (examples: `onLoad`, `onRun`, `onCallback`, and module specific props passed to the `State` component)
- `cancelDispatch` - Method that will cancel the dispatch (nothing will be saved to store).
- `isDispatchCancelled` - Method that can be used in `onCallback` middleware to determine if dispatch was cancelled.
- `get` - Method that gets state from a store item by key.
- `set` - Method that sets state of a store item by key.
- `reset` - Method that resets store item to it's initial state by key. **Note: If no key is passed then it will reset all store items to initial.** state.
