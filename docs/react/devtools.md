# Neuron Devtools

Neuron has it's own dedicated Devtools that can be used to keep track of state in your app. As of now the Devtools are only compatible with Neuron React.

## Setup

**Add Panel to App**
The `DevtoolsPanel` is a React component. It needs to be added to the top most level of your app.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import DevtoolsPanel from "@sandstack/neuron/DevtoolsPanel";
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
The `Devtools` module needs to be added to each `Store` you want to track with the Devtools Panel. You must add the store name to the Devtools Module.

```jsx
import Neuron from "@sandstack/neuron/react";
import Devtools from "@sandstack/neuron/modules/devtools";

export const { State, Module } = Neuron.Store();

export default function Store() {
  return (
    <>
      <Module use={Devtools({ storeName: "PokemonStore" })} />
      <State name={"trainer"} state={"Goh"}/>
      <State name={"pokemon"} state={"Mewtwo"}} />
    </>
  );
}

```
