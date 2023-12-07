<div><img src='https://sandstack.dev/Neuron-Banner.png' /></div>
<p>&nbsp;</p>

[![npm version](https://badge.fury.io/js/@sandstack%2Fneuron.svg)](https://badge.fury.io/js/@sandstack%2Fneuron)
![build](https://github.com/hjrdave/Neuron/actions/workflows/npm-publish.yml/badge.svg?event=push)
![size](https://badgen.net/bundlephobia/minzip/@sandstack/neuron)

# Neuron Global State Manager

The Neuron Global State Manager is a small, bare bones, framework agnostic library for building framework specific global state managers.

Neuron Vanilla can be used in any js application by itself or you can tailor it to your framework of choice. My goal is to create framework specific version of this that use vanilla under the hood.
See [Neuron React](#React) as an example.

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
import Persist from @sandstack/neuron/modules/persist;

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

# Neuron React

Neuron Global State Manager for React.js. This is a React.js specific global state management library that uses Neuron Vanilla internally to manage state. It is fast, small, and does not need React Context to manage state. It uses a declarative approach for instantiating stores and uses hooks to manage those stores.

## Manage Global State

1. Create a new `Store`

```jsx
import Neuron from "@sandstack/neuron/react";

export const { State, useNeuron } = Neuron.Store();

export default function AppStore() {
  return (
    <>
      <State name={"fruit"} state={"apple"} />

      <State name={"car"} state={"Tesla"} />
    </>
  );
}
```

2. Instantiate Store

```jsx
function App() {
  return (
    <>
      <AppStore />
      <Comp />
    </>
  );
}
```

3. Get and Set state with Store hook

```jsx

function Comp(){

    const [fruit, setFruit] = useNeuron('fruit');
    const [car, setCar] = useNeuron('car');

    return(
        <p>This is my favorite fruit, {fruit}</p>
        <p>This is my favorite car, {car}</p>
        <button onClick={() => setFruit('orange')}>Change Fruit</button>
        <button onClick={() => setCar('Ford')}>Change Car</button>
    );
}

```

Alternatively to the magic string selector like `'fruit'`. You can also select state with an arrow function like this `(store) => store.fruit`.

```jsx
function Comp() {
  const [fruit, setFruit] = useNeuron((store) => store.fruit);
  const [car, setCar] = useNeuron((store) => store.car);
}
```

## Slices

Slices allow deep nested objects to be retrieved and updated easily, with the standard Neuron getter and setter api.

Below we have a Store item that has a deep nested object passed to it.

```jsx
<State
    name={'person'}
    state={{
        name: 'Bob',
        meta: {
            age: 30,
            job: {
                title: 'Developer'.
                salary: 90,000
            }
        }
    }}
/>
```

We want to be able to retrieve certain properties and set those properties with out complicated object spreading. We can use slices to do this. Example below:

```jsx
function Comp(){

    const [name, setName] = useNeuron((store) => store.person.name);
    const [title, setTitle] = useNeuron((store) => store.person.meta.job.title);
    const [salary, setSalary] = useNeuron((store) => store.person.meta.job.salary);

    return(
        <p>My name is {name}</p>
        <p>I am a {title}</p>
        <p>I make {salary} a year.</p>
        <button onClick={() => setName('Jim')}>Change Name</button>
        <button onClick={() => setTitle('Designer')}>Change Title</button>
        <button onClick={() => setSalary(60000)}>Change Salary</button>
    );
}
```

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

## Modules

Modules are a way to hook into store middleware and extend Neuron with features like state persistance and dev tools. Below is an example of extending a Neuron store with state persistence by using the `Persist` module. You can use the `Store.Use` component to inject a module into your store. Each module works different and might have a different api. In the case below, the `Persist` module is instantiated and the feature flag `persist` is set on the store items that you want to run the module on.

```jsx
import Neuron from "@sandstack/neuron/react";
import Persist from "@sandstack/neuron/persist";

export const { State, Module, useNeuron } = Neuron.Store();

export default function AppStore() {
  return (
    <>
      <Module use={Persist} />

      <State
        name={"fruit"}
        state={"apple"}
        persist //This tells the module to run on this store item
      />

      <State name={"car"} state={"Tesla"} />
    </>
  );
}
```

~ Modules run before custom middleware.
~ Modules must be instantiated before store items.

## Private Stores

By default Neuron stores are globally instantiated. This means that any component in the component tree has access to it, via store selectors. This also means that stores are not tied to any one component and its children. Private stores can be setup so only components nested as children in the `Private` store provider has access to that store. This allows us to prevent components that render outside that scope from affecting the store. It also allows for stores to be tide to a component which means you can create one component with a dedicated store that can be reused as seperate instances.

### Create Private Store

```jsx
import Neuron from "@sandstack/neuron/react";
import Persist from "@sandstack/neuron/persist";

// Private store must be instantiated outside of Store component;
export const { usePrivateStore, Private } = Neuron.PrivateStore();

export default function AppStore({ children }) {
  // Private store hook is ran inside of Store component
  const { Module, State } = usePrivateStore();

  return (
    <>
      <Module use={Persist} />

      <State name={"fruit"} state={"apple"} />

      <State name={"car"} state={"Tesla"} />

      {/** Private provider componet is set with children under Module and State JSX**/}
      <Private>{children}</Private>
    </>
  );
}
```

### Instantiate Private Store

The `AppStore` can now be instantiated in a JSX file somewhere.

```jsx
import AppStore from './';
import SomeChildComp from './SomeChildComp';

export default function App(){

    return(
        <>
            <AppStore>
                <SomeChildComp>
            </AppStore>
        </>
    )
}

```

### Get and Set State

You can get and set state in children components just like a regular store.

```jsx
import { useNeuron } from "./";

export default function SomeChildComp() {
  const [fruit, setFruit] = useNeuron("fruit");
  const [car, setCar] = useNeuron("car");

  return (
    <>
      <p>This is my favorite fruit, {fruit}</p>
      <p>This is my favorite car, {car}</p>
      <button onClick={() => setFruit("orange")}>Change Fruit</button>
      <button onClick={() => setCar("Ford")}>Change Car</button>
    </>
  );
}
```

~ The `Private` setter/getter hooks MUST be called within the Store scope or it will throw an error.

# Neuron Devtools

Neuron has it's own dedicated Devtools that can be used to keep track of state in your app. As of now the Devtools are only compatible with Neuron React.

## Setup

**Add Panel to App**
The `DevtoolsPanel` is a React component. It needs to be added to the top most level of your app.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import DevtoolsPanel from "@sandstack/neuron/DevtoolsPanel";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DevtoolsPanel />
    <Store />
    <App />
  </React.StrictMode>
);
```

**Add Devtools Module to Store**
The `Devtools` module needs to be added to each `Store` you want to track with the Devtools Panel. You must add the store name to the Devtools Module.

```jsx
import Neuron from "@sandstack/neuron/react";
import Devtools from "@sandstack/neuron/modules/devtools";

export const { State, Module } = Neuron.Store();

export default function Store() {
  return (
    <>
      <Module use={Devtools({ storeName: "PokemonStore" })} />
      <State name={"trainer"} state={"Goh"}/>
      <State name={"pokemon"} state={"Mewtwo"}} />
    </>
  );
}

```
