# Neuron React

Neuron React is a React only global state management library that is a wrapper around Neuron VanillaJS. It is set up to create stores declaratively through components and uses React hooks to manage state. It also includes other features like state slices and private stores.

## Setup

To use just install Neuron into your app.

```bash
npm install @sandstack/neuron
//or
yarn add @sandstack/neuron
```

## Import into App

You will import the React configuration into your app instead of the base configuration.

```javascript
import Neuron from "@sandstack/neuron/react";

const Store = Neuron.Store();
```

Note - Neuron React does not use React Context to manage state. The exception to this is private stores, which does use React Context under the hood.
