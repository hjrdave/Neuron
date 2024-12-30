# Middleware

Middleware is used to implement logic during the lifecycle of state changes. It has access to the dispatched state and `payload`.

## Types

There are three different middleware types that can be called at different times during the dispatch lifecycle.

### onInit

Invokes only once when the Neuron is first instantiated.

```javascript
const usePokemon = neuron("Pikachu", {
  onInit: () => {
    //do something when Neuron first instantiates
  },
});
```

### onDispatch

Invokes every time a `set` or `dispatch` method is fired. It runs before state is updated.

```javascript
const usePokemon = neuron("Pikachu", {
  onDispatch: () => {
    //do something every time state is updated
  },
});
```

### onCallback

Invokes after the store is updated. This will run even if the update fails.

```javascript
const usePokemon = neuron("Pikachu", {
  onCallback: () => {
    //do something every time state is updated
  },
});
```

### Payload

The payload is an object of properties and methods that is made available to each middleware mutator function. This allows logic to manipulate state or even cancel a dispatch in mid flight.

**Properties**

`key` - Neuron key.

`prevState` - Previous state.

`state` - Dispatched state. _Mutable_

`features` - Features set for the store item. Module specific props passed to the _features_ property in the Neuron options.

**Methods**

`cancelDispatch` - Cancels the dispatch.

`isDispatchCancelled` - Checks to see if the dispatch was cancelled.

### Examples of using middleware and payloads

#### Example 1

Make sure dispatched state is always capitalized.

```javascript
const usePokemon = neuron("Pikachu", {
  onDispatch: (payload) => {
    const capitalizedState = `${payload.state
      .charAt(0)
      .toUpperCase()}${phrase.slice(1)}`;
    payload.state = capitalizedState;
  },
});
```

#### Example 2

Cancel a dispatch if the state does not meet a certain condition.

```javascript
const usePokemon = neuron("Pikachu", {
  onDispatch: (payload) => {
    if (payload.state === "trubbish") {
      payload.cancelDispatch();
      alert("Trubbish should not exist. Try again");
    }
  },
});
```

#### Example 3

Update another state if the dispatched state is a certain value.

```javascript
const useTrainer = neuron("Ash");
const usePokemon = neuron("Pikachu", {
  onCallback: (payload) => {
    if (payload.state === "Meowth") {
      trainer.set("Team Rocket");
    }
  },
});
```

Middleware and payloads when used together can be very powerful and help centralize common state logic.
