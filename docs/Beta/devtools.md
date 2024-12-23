<div><img src='https://sandstack.dev/readme-devtools.png' /></div>

# Neuron Devtools

Neuron has it's own dedicated Devtools that can be used to keep track of state in your app. As of now the Devtools are only compatible with React Neuron.

> **Warning:** This library is still experimental and is not ready for production. The api is actively being worked on and will change.

## Install

Install Neuron Devtools package into your project.

```bash
npm install @sandstack/neuron-devtools
```

## Setup

**Add Panel to App**
The `DevtoolsPanel` is a React component. It needs to be added to the top most level of your app.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import DevtoolsPanel from "@sandstack/neuron-devtools";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DevtoolsPanel />
    <Store />
    <App />
  </React.StrictMode>
);
```

**Add Devtools Module to Store**
The `Devtools` module needs to be added to each `Neuron` or `NeuronClient` modules prop you want to track with the Devtools Panel. You must add the neuron name to the Devtools Module.

```jsx
import { NeuronClient } from "@sandstack/neuron/react";
import { Devtools } from "@sandstack/neuron-devtools";

export const client = NeuronClient({
  modules: [Devtools({ storeName: "PokemonStore" })],
});

const usePokemon = client.neuron("Mewtwo");
const useTrainer = client.neuron("Goh");
```
