# Modules

Modules allow for Neuron to be extended with new features. They hook into store middleware and can change state based on pre configured logic.

## Add a Module

Modules can be added to a Neuron by passing it to the `modules` parameter. Example below.

```javascript
import { Neuron } from "@sandstack/neuron";
import { Persist } from "@sandstack/neuron/persist";

const pokemon = new Neuron(
  "ash",
  {
    /*Options*/
  },
  [Persist]
);

console.log(pokemon.getRef()); // state will be persisted between browser refreshes
```
