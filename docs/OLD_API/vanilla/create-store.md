# Create Store

Neuron stores are easy to set up and only require a key/value pair to instantiate a state. Stores are dynamic in nature and state can be added to the store any where at any time. Reading and updating non existent state will fail gracefully.

### Create a new store

```javascript
import { createStore } from "@sandstack/neuron";

export const Store = createStore();
```

### Add initial state to store

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

## Important Notes about Stores

- Stores must be instantiated before they can be read.
- They are global and are accessible from anywhere that is able to call them.
- Neuron stores are dynamic by nature. This means that state can be added to them at anytime or anywhere from the app.
- Stores fail gracefully. If there is an attempt to read or update non existent state. The store will just ignore the request.
- It is best practice to create a separate `Store.js` file and keep your store logic in that file. This a suggestion, but you can do what works best given your developer needs. Neuron will work the same.
