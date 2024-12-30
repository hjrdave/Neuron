# Modules

Modules allow for Neuron to be extended with new features. They hook into store middleware and can change state based on pre configured logic.

## Add a Module

Modules can be added to a Neuron by passing it to the `modules` parameter. Example below.

```javascript
import { neuron } from "@sandstack/neuron/react";
import { Persist } from "@sandstack/neuron/persist";

const usePokemon = neuron(
  "Pichu",
  {
    /*Options*/
  },
  [Persist]
);
function Comp() {
  const [pokemon] = usePokemon();
  return (
    <p>{pokemon}</p> // state will be persisted between browser refreshes
  );
}
```
