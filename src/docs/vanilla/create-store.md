## Setup Store

### Create a new Store

```javascript
import Neuron from "@sandstack/neuron";

export const Store = Neuron.Store();
```

### Add initial state to Store

```javascript
Store.add({
  key: "name",
  state: "Ash Ketchum",
});

Store.add({
  key: "age",
  state: 10,
});
```
