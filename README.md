<!-- [![npm version](https://badge.fury.io/js/@neurongsm%2Fcore.svg)](https://badge.fury.io/js/@neurongsm%2Fcore)
[![Neuron Package](https://github.com/hjrdave/Neuron.Core/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/hjrdave/Neuron.Core/actions/workflows/npm-publish.yml)
![Package](https://badgen.net/bundlephobia/minzip/@neurongsm/core) -->

<!-- <div><img src='https://hjrdave.github.io/get-treble-gsm/static/bd3520df0df3356f8a53c4588b0b285c/f3583/banner-readme.png' /></div>
<p>&nbsp;</p> -->

# Neuron Global State Manager

Neuron Core is a small, bare bones, framework agnostic library for building framework specific global state managers. The goal is to allow devs to create small, scalable, and advanced state managers that fit their respective framework needs. See [Neuron](https://www.npmjs.com/package/@neurongsm/react) as an example.

<div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 1em;">
  <strong>Warning:</strong> This library is still experimental and is not ready for production.
</div>

## Setup Store

### Create a new Store

```javascript
import Neuron from "@sandstack/neuron";

export const Store = Neuron.Store();
```

### Add initial state to Store

```javascript
Store.add({
  key: "name",
  state: "Ash Ketchum",
});

Store.add({
  key: "age",
  state: 10,
});
```

### Update state

```javascript
Store.set("name", "Gary Oak"); //key, new state
```

### Get state

```javascript
Store.get("name"); //key
```

### Listen for state changes

```javascript
Store.onDispatch((dispatchItem) => {
  if (dispatchItem.key === "name") {
    console.log(dispatchItem.state);
  }
});

//initial console.log output
//name: Ash Ketchum

//new console.log output
//name: Gary Oak
```

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

### Extend Neuron with Modules

Modules like Persist allow you to extend Neuron features. In this case (only works in browser) state will be persisted between page refreshes. Modules must be applied by the `use` method on the `Store`. They must be set before any `add` methods.

```javascript
import Persist from @sandstack/modules/persist;

const Store = Neuron.Store();

Store.use(Persist);

Store.add({
    key: 'trainer',
    state: 'Ash Ketchum',
    features:{
        persist: true
    }
});

```
