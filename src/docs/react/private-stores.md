# Private Stores

By default Neuron stores are globally instantiated. This means any component in the component tree has access to it, via store selectors. This also means that stores are not tied to any one component and its children. Private stores can be setup so only components nested as children in the `Private` store provider has access to that store. This allows us to prevent components that render outside of scope from affecting the store. It also allows for stores to be scoped to a component which means you can create one component with a dedicated store that can be reused as separate instances.

## Create Private Store

Instead of instantiating a `Neuron.Store` we will instantiate a `Neuron.PrivateStore` in our store file.

```jsx
import Neuron from "@sandstack/neuron/react";

// Private store must be instantiated outside of Store component;
export const {} = Neuron.PrivateStore();
```

#### usePrivateStore

The `PrivateStore` instance returns a `usePrivateStore` hook. This will be called in our store component. It is basically the normal `Store` instance and returns methods and components to create our store. The reason for this is because the actual store will need to be called within our component so it can be mounted, unmounted, and make use of children components.

```jsx
import Neuron from "@sandstack/neuron/react";

export const { usePrivateStore } = Neuron.PrivateStore();

export default function AppStore() {
  const { State } = usePrivateStore();

  return (
    <>
      <State name={"pokemon"} state={"pikachu"} />
    </>
  );
}
```

#### Private

The `PrivateStore` instance also returns a `Private` component. This will be called within our store component and it will accept children. This allows our store to be used like a traditional state provider and wrap around children components. Only the children components will be able to read and update our store.

```jsx
import Neuron from "@sandstack/neuron/react";

export const { usePrivateStore, Private } = Neuron.PrivateStore();

export default function AppStore({ children }) {
  const { State } = usePrivateStore();

  return (
    <>
      <State name={"pokemon"} state={"pikachu"} />

      <Private>{children}</Private>
    </>
  );
}
```

## Instantiate Private Store

The `AppStore` can now be instantiated in a JSX file somewhere. Wrap any components you want to have access to this store.

```jsx
import AppStore from './';
import Comp from './Comp';

export default function App(){

    return(
        <>
            <AppStore>
                <Comp>
            </AppStore>
        </>
    )
}

```

### Get and Set State

You can get and set state in children components just like a regular store. Make sure your private store is exporting the `useNeuron` hook.

```jsx
export { useNeuron } = Neuron.PrivateStore();
```

```jsx
import { useNeuron } from "./";

export default function SomeChildComp() {
  const [pokemon, setPokemon] = useNeuron("pokemon");

  return (
    <>
      <p>This is my favorite pokemon, {pokemon}</p>
      <button onClick={() => setPokemon("lugia")}>Change Pokemon</button>
    </>
  );
}
```

~ The `Private` setter/getter hooks MUST be called within the Store scope or it will throw an error.
