<div><img src='https://sandstack.dev/readme-neuron.png' /></div>

[![npm version](https://badge.fury.io/js/@sandstack%2Fneuron.svg)](https://badge.fury.io/js/@sandstack%2Fneuron)
![build](https://github.com/hjrdave/Neuron/actions/workflows/npm-publish.yml/badge.svg?event=push)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40sandstack%2Fneuron)

# Neuron Global State Manager

The Neuron Global State Manager is a small, bare bones, framework agnostic library for building framework specific global state managers.

Neuron Core can be used in any js application by itself or you can tailor it to your framework of choice. My goal is to create framework specific version of this that use core under the hood.
See [React Neuron](https://sandstack.dev/neuron/docs/react/about) as an example.

<div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 1em;">
  <strong>Warning:</strong> This library is still experimental and is not ready for production.
</div>

## Setup Neuron State

### Create a new Neuron

```javascript
import { Neuron } from "@sandstack/neuron";

const trainer = new Neuron("Ash Ketchum");
```

### Update state

```javascript
trainer.set("Gary Oak");
```

### Get state

```javascript
const name = trainer.getRef();
```

### Listen for state changes

```javascript
trainer.effect((payload) => {
  console.log(payload.state);
});

//initial console.log output
//name: Ash Ketchum

//new console.log output
//name: Gary Oak
```

Learn more about [Neuron Core](https://sandstack.dev/neuron) and [React Neuron](https://sandstack.dev/neuron/docs/react/about).
