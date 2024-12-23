# Module Documentation

The library includes additional modules to enhance its core and React functionality. Below is a detailed overview of the `shallow` and `persist` modules.

---

## Shallow Module

The **shallow** module provides utilities for shallow comparisons, ensuring efficient state updates by preventing unnecessary re-renders in components.

### Exported Utilities

#### 1. `shallowEqual`

A function to compare two objects for shallow equality.

##### Import

```typescript
import { shallowEqual } from "your-library/shallow";
```

##### Parameters

- `objA: object`: The first object to compare.
- `objB: object`: The second object to compare.

##### Returns

- `boolean`: `true` if the objects are shallowly equal, otherwise `false`.

##### Example

```typescript
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };

console.log(shallowEqual(obj1, obj2)); // true

const obj3 = { a: 1, b: 3 };
console.log(shallowEqual(obj1, obj3)); // false
```

---

## Persist Module

The **persist** module adds persistence capabilities to the library, allowing neuron states to be saved and restored across sessions.

### Exported Utilities

#### 1. `persistNeuron`

A function to enable persistence for a neuron.

##### Import

```typescript
import { persistNeuron } from "your-library/persist";
```

##### Parameters

- `neuron: Neuron`: The neuron instance to persist.
- `storageKey: string`: The key under which the state is stored.

##### Example

```typescript
import { Neuron } from "your-library/core";
import { persistNeuron } from "your-library/persist";

const neuron = new Neuron("exampleKey", { initialState: { count: 0 } });
persistNeuron(neuron, "exampleKey");

// State will now persist across sessions
neuron.setState({ count: 10 });
```

---

## Summary

- The **shallow** module ensures efficient state updates by comparing objects shallowly, preventing unnecessary computations.
- The **persist** module enables neuron state persistence, making it ideal for scenarios where state needs to be maintained across browser sessions or application reloads.
