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
