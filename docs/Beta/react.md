# React Library Documentation

The **React-specific library** builds upon the core library to provide a seamless integration with React. It introduces utilities and components designed to work directly within React applications.

---

## Exports

### 1. `neuron`

The `neuron` utility provides a hook-based interface for managing reactive state within React components.

#### Import

```typescript
import { neuron } from "your-library/react";
```

#### Example

```tsx
import React from "react";
import { neuron } from "your-library/react";

const useCounter = neuron("counter", { initialState: { count: 0 } });

export const Counter = () => {
  const [state, setState] = useCounter();

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
};
```

---

### 2. `NeuronClient`

The React-adapted `NeuronClient` provides centralized state management for React applications, enabling coordinated state across multiple components.

#### Import

```typescript
import { NeuronClient } from "your-library/react";
```

#### Example

```tsx
import React, { createContext, useContext } from "react";
import { NeuronClient } from "your-library/react";

const client = new NeuronClient();
const ClientContext = createContext(client);

export const useNeuronClient = () => useContext(ClientContext);

export const App = () => (
  <ClientContext.Provider value={client}>
    <YourComponent />
  </ClientContext.Provider>
);
```

---

### 3. `PrivateNeuronClient`

The `PrivateNeuronClient` is a specialized version of `NeuronClient` designed for isolated state management within React components. Each component using a `PrivateNeuronClient` instance operates independently, ensuring no state leakage or interference.

#### Import

```typescript
import { PrivateNeuronClient } from "your-library/react";
```

#### Example

```tsx
import React from "react";
import { PrivateNeuronClient } from "your-library/react";

const client = new PrivateNeuronClient();

export const YourComponent = () => {
  const neuron = client.createNeuron("localState", {
    initialState: { value: 42 },
  });
  const state = neuron.getState();

  return <div>Value: {state.value}</div>;
};
```

---

## Summary

The React library enhances the core functionality by providing tools tailored for React's component-based architecture. With `neuron`, `NeuronClient`, and `PrivateNeuronClient`, you can manage state effectively in both simple and complex React applications.
