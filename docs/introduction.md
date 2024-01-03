---
title: Introduction
description: The Neuron Global State Manager is a small, bare bones, framework agnostic library for managing client state in javascript user interfaces.
subnav:
  - What is Global State?
  - Motivation
  - Vanilla Neuron Example
  - React Neuron Example
---

![Neuron Global State Manager](https://sandstack.dev/readme-neuron.png "a title")

# Introduction

The Neuron State Manager is a small, bare bones, framework agnostic library for managing client state in javascript user interfaces. It is simple enough to be used by itself or tailor fitted to be used with any UI Framework of your choice. The vanilla npm package is less than _2KBs_ and can be configured anyway to your tech stack or project needs.

## What is Global State?

State is the current condition or snapshot of a system at a particular moment. In user interfaces state is basically variables with observables on them that will be reflected in the user interface when it changes.

In component architecture, each component controls its own local state. When that component rerenders the state will reset. This causes an issue when multiple components need to share the same state. We must find creative ways to do this. Whether its prop drilling or local storage, a better solution is needed.

Enter global state. Global state is lifting your state variables outside of your components. The global state does not care how or when a component is rerendered. The state only changes if a component explicitly changes it. With this method we can create a global store for our components and they can subscribe and unsubscribe to that Store. See the graphic below.

## Motivation

I created Neuron because I wanted a light weight and unopinionated state management solution, that could be configured to work with any javascript framework. I also realized that many state management solutions in the wild currently were convoluted, had lots of boilerplate, and missing some key features that can make complicated UI components easier to make.

I decided to create my own solution for managing client state, and thus Neuron was born. It has module support for easily extending functionality, and handy devtools for state transparency. I also created a React specific version using vanilla Neuron as it's foundation. See [React](/react/about).

![Neuron Global State Manager - Vanilla](https://sandstack.dev/neuron-vanilla-banner.png "a title")

## Vanilla Neuron Example

The vanilla package is just pure javascript. You can use this by importing `@sandstack/neuron` into your file.

```javascript
import Neuron from "@sandstack/neuron";

const Store = Neuron.Store();

//add state to store
Store.add({
  key: "pokemon",
  state: "Pikachu",
});

//Read and Update state
Store.get("pokemon");
//output: Pikachu

Store.set("pokemon", "Mewtwo");
Store.get("pokemon");
//output: Mewtwo

//Listen for store updates
onDispatch((payload) => {
  if (payload.key === "pokemon") {
    //do something
  }
});
```

![Neuron Global State Manager - React](https://sandstack.dev/neuron-react-banner.png "a title")

## React Neuron Example

Neuron has first class support for React. You can use the React specific package by importing `@sandstack/neuron/react` into your file.

```jsx
import Neuron from '@sandstack/neuron/react'

const {State, useNeuron} = Neuron.Store();

function Store(){
  return(
    <>
     <State name={'pokemon'} state={'Pikachu'}/>
    </>
  )
}
function Comp(){
  const [pokemon, setPokemon] = useNeuron('pokemon')

  return(
    <>
    <p>My favorite Pokemon is: {pokemon}</p>
    <button onClick={() => setPokemon('Mewtwo')}>
  </>
  )
}
```

Happy Coding!!
