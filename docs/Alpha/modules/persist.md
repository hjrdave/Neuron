# Persist

Persist allows for state persistance in state. This is opt in and you must set the `persist` prop to `true`.

```jsx
import { createStore } from "@sandstack/neuron/react";
import { Persist } from "@sandstack/neuron/persist";

export const { State, Module, useNeuron } = createStore();

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
