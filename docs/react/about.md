# React Neuron

React Neuron is a React only global state management library that wraps Neuron Core with a React specific API. It is setup to use React hooks to manage state within React components. It also includes other features like state slices and private stores.

## Setup

To use just install Neuron into your app.

```bash
npm install @sandstack/neuron
//or
yarn add @sandstack/neuron
```

## Import into App

You will import the React configuration into your app instead of the base configuration whenever you need to use React Neuron features.

```javascript
import { neuron } from "@sandstack/neuron/react";

const useTrainer = neuron("Ash");
```

Note - React Neuron does not use React Context to manage state. The exception to this is private stores, which use React Context under the hood.
