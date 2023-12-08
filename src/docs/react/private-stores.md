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
