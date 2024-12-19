# Core Library Documentation

The **core library** is the foundation of the state management library. It provides the core functionality for managing state in any HTML or Node.js environment. Below is a detailed overview of the core exports and their usage.

---

## Exports

### 1. `Neuron`

The `Neuron` class is the fundamental unit of state management. It allows for creating and managing reactive state.

#### Import

```typescript
import { Neuron } from "your-library/core";
```

#### Constructor Options

- `key` (`string | symbol`): A unique identifier for the neuron.
- `options` (`NeuronOptions`): Configuration options.

#### Example

```typescript
const neuron = new Neuron("exampleKey", { persistent: true });
neuron.setState({ count: 0 });
console.log(neuron.getState()); // { count: 0 }
```

---

### 2. `NeuronClient`

The `NeuronClient` class is a higher-level abstraction for managing multiple neurons. It acts as a central hub for state coordination.

#### Import

```typescript
import { NeuronClient } from "your-library/core";
```

#### Methods

- `createNeuron(key: string, options: NeuronOptions): Neuron`
- `getNeuron(key: string): Neuron | undefined`

#### Example

```typescript
const client = new NeuronClient();
const neuron = client.createNeuron("userState", { persistent: false });
neuron.setState({ name: "Alice" });
console.log(client.getNeuron("userState")?.getState()); // { name: 'Alice' }
```

---

### 3. `Module`

The `Module` class provides modular state management, grouping neurons into functional units.

#### Import

```typescript
import { Module } from "your-library/core";
```

#### Example

```typescript
const userModule = new Module("UserModule");
const userNeuron = userModule.createNeuron("user");
userNeuron.setState({ loggedIn: true });
console.log(userNeuron.getState()); // { loggedIn: true }
```

---

### 4. Types

#### `IPayload`

Interface representing a payload structure.

#### `NeuronOptions`

Options for configuring a neuron.

- `persistent` (`boolean`): Whether the state should persist across sessions.
- `initialState` (`any`): The initial state for the neuron.

#### `INeuron`

Interface for neuron instances.

- `getState(): any`
- `setState(state: any): void`

---

## Summary

The core library provides the building blocks for creating scalable state management solutions. With `Neuron`, `NeuronClient`, and `Module`, you can create simple or complex state management flows tailored to your application's needs.
