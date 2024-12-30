# Modules

Modules allow for Neuron to be extended with new features. They hook into store middleware and can change state based on pre configured logic.

## Add a Module

Modules can be added to a store by using the `use` method. This method takes the module as a parameter and adds it to the store. Modules **must** be called above the `add` methods.

The Persist module is a good example of a Neuron module. This allows state to be persisted between page refreshes. It adds a prop to the store features called `persist`. This allows for each store item to have state persistence toggled onto it. See below.

```javascript
import { Persist } from "@sandstack/neuron/persist";

const Store = createStore();

Store.use(Persist);

Store.add({
  key: "trainer",
  state: "Ash Ketchum",
  features: {
    persist: true,
  },
});
```
