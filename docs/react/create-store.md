# Create Store

Stores in Neuron React are setup differently from traditional store patterns. I believe "stores as components" is a great way to organize complicated logic and allows for stores to be organized in a more natural React way. If you are coming from other state management solutions or are new to React I think "stores as components" will be a welcome paradigm shift for you.

Note - If you are using React without JSX (I do not recommend this), then Neuron VanillaJS will need to be used.

## Instantiate store

It is recommend to create a new file called `Store.jsx` or `App.store.jsx` file. You will need to import Neuron and instantiate your store. Make sure that your store is exported from the file.

```jsx
import { createStore } from "@sandstack/neuron/react";

export const { State } = createStore();
```

## Create store component

Neuron state are set up as children components under the instantiated store. You can name this store component something that pertains to it's purpose. You need to give this component the default export.

```jsx
import { createStore } from "@sandstack/neuron/react";

export const {} = Neuron.Store();

export default function AppStore() {
  return <>{/** state will go here **/}</>;
}
```

## Add state components to store

The instantiated `Neuron.Store` returns a component called `State`. You can add state to your store by calling this component. It takes 2 props called `name`, which is the state key and `state`, which holds the default state value.

```jsx
import {createStore} from "@sandstack/neuron/react";

export const { State } = Neuron.Store();

export default function AppStore() {
  return(
    <>
      <State name={'pokemon'} state={'pikachu'}>
    </>
  );
}
```

## Include store in app

You will need to import your store component and call it in your app. It needs to be set at the root level before any other components.

```jsx
import AppStore from "./AppStore.jsx";
function App() {
  return (
    <>
      <AppStore />
      <Comp />
    </>
  );
}
```

Now your app has a store that can hold state.

Note - All Neuron stores with the exception of private stores are global and can be called from any component in your app.
