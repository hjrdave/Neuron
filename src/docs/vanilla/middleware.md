# Middleware

Middleware is used to implement logic before or after state is updated to the store. Middleware has access to the dispatched state and is able to manipulate other state items via a mutator function.

## Types

There are three different middleware types that can be called at different times during the dispatch lifecycle.

### onLoad

Runs only once when the `add` method instantiates the state.

```javascript
Store.add({
  key: "pokemon",
  state: "pikachu",
  features: {
    onLoad: () => {
      //I fire only once when the state first instantiates.
    },
  },
});
```

### onRun

Runs every time a `set` or `dispatch` is fired. It runs before state is saved to the store.

```javascript
Store.add({
  key: "pokemon",
  state: "pikachu",
  features: {
    onRun: () => {
      //I run every time state is dispatched to the store.
    },
  },
});
```

### onCallback

Runs after the store is updated. This will run even if the dispatch fails.

```javascript
Store.add({
  key: "pokemon",
  state: "pikachu",
  features: {
    onCallback: () => {
      //I run after the store has been updated.
    },
  },
});
```

### Payload

The payload is an object of properties and methods that is made available to each middleware mutator function. This allows logic to manipulate state or even cancel a dispatch in mid flight.

**Properties**

`key` - State key.

`prevState` - Previous state.

`state` - Dispatched state. _Mutable_

`data` - A custom object that can be passed to middleware to make advanced state calculations. _Mutable_

`features` - Features set for the store item.  
examples: _onLoad_, _onRun_, _onCallback_, and module specific props passed to the _features_ property in the _add_ method.

**Methods**

`cancelDispatch` - Cancels the dispatch.

`isDispatchCancelled` - Checks to see if the dispatch was cancelled.

`get` - Gets state by key.

`set` - Sets new state value by key.

`reset` - Resets store item to it's initial state by key.

**Note: If no key is passed then it will reset all store items to initial state.**

### Examples of using middleware and payloads

#### Example 1

Make sure dispatched state is always capitalized.

```javascript
Store.add({
  key: "pokemon",
  state: "pikachu",
  features: {
    onRun: (payload) => {
      const capitalizedState = `${payload.state
        .charAt(0)
        .toUpperCase()}${phrase.slice(1)}`;
      payload.state = capitalizedState;
    },
  },
});
```

#### Example 2

Cancel a dispatch if the state does not meet a certain condition.

```javascript
Store.add({
  key: "pokemon",
  state: "pikachu",
  features: {
    onRun: (payload) => {
      if (payload.state === "trubbish") {
        payload.cancelDispatch();
        alert("Trubbish should not exist. Try again");
      }
    },
  },
});
```

#### Example 3

Update another state if the dispatched state is a certain value.

```javascript
Store.add({
  key: "pokemon",
  state: "pikachu",
  features: {
    onCallback: (payload) => {
      if (payload.state === "Meowth") {
        payload.set("trainer", "Team Rocket");
      }
    },
  },
});
```

Middleware and payloads when used together can be very powerful and help centralize common state logic in your app.
