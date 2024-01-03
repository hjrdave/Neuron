# Modules

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
