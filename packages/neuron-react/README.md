<div><img src='https://sandstack.dev/readme-neuron.png' /></div>

[![npm version](https://badge.fury.io/js/@sandstack%2Fneuron.svg)](https://badge.fury.io/js/@sandstack%2Fneuron)
![build](https://github.com/hjrdave/Neuron/actions/workflows/npm-publish.yml/badge.svg?event=push)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40sandstack%2Fneuron)

# Neuron React

The Neuron Global State Manager is a small, bare bones, framework agnostic library for building framework specific global state managers.

Neuron Vanilla can be used in any js application by itself or you can tailor it to your framework of choice. My goal is to create framework specific version of this that use vanilla under the hood.
See [Neuron React](#neuron-react) as an example.

<div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 1em;">
  <strong>Warning:</strong> This library is still experimental and is not ready for production.
</div>

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

### Update state

```javascript
Store.set("name", "Gary Oak"); //key, new state
```

### Get state

```javascript
Store.get("name"); //key
```

### Listen for state changes

```javascript
Store.onDispatch((dispatchItem) => {
  if (dispatchItem.key === "name") {
    console.log(dispatchItem.state);
  }
});

//initial console.log output
//name: Ash Ketchum

//new console.log output
//name: Gary Oak
```

You can learn more about Neuron [here](https://sandstack.dev/neuron).
