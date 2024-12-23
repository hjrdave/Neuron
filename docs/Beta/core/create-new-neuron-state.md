# Create New Neuron State

Neurons are easy to set up and only require an initial value to instantiate a state.

### Instantiate Neuron state

```javascript
import { Neuron } from "@sandstack/neuron";

const name = new Neuron("Ash Ketchum");
const age = new Neuron(10);
```

## Important Notes about Neurons

- They are global and are accessible from anywhere that is able to call them.
- Neurons are typesafe if Typescript is being used. The initial state determines each Neuron's type.
- It is best practice to create a seperate file for your Neuron state. This is a suggestion and not a rule though.
