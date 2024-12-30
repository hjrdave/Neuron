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

> **Warning:** This library is still experimental and is not ready for production.

# Introduction

The Neuron State Manager is a small, bare bones, framework agnostic library for managing client state in javascript user interfaces. It is simple enough to be used by itself or tailor fitted to be used with any UI Framework of your choice. The core npm package is less than _2KBs_ and can be configured anyway to your tech stack or project needs.

## What is Global State?

State is the current condition or snapshot of a system at a particular moment. In user interfaces state is basically variables with observables on them that will be reflected in the user interface when it changes.

In component architecture, each component controls its own local state. When that component rerenders the state will reset. This causes an issue when multiple components need to share the same state. We must find creative ways to do this. Whether its prop drilling or local storage, a better solution is needed.

Enter global state. Global state is lifting your state variables outside of your components. The global state does not care how or when a component is rerendered. The state only changes if a component explicitly changes it. With this method we can create a global store for our components and they can subscribe and unsubscribe to that Store. See the graphic below.

## Motivation

I created Neuron because I wanted a light weight and unopinionated state management solution, that could be configured to work with any javascript framework. I also realized that many state management solutions in the wild were convoluted, had lots of boilerplate, and missing some key features that can make complicated UI components easier to develop.

I decided to create my own solution for managing client state, and thus Neuron was born. It has module support for easily extending functionality, and handy devtools for state transparency. I also created a React specific version using Core Neuron as it's foundation. See [React](/react/about).

![Neuron Global State Manager - Vanilla](https://sandstack.dev/neuron-vanilla-banner.png "a title")

## Core Neuron Example

The core package is just pure javascript. You can use this by importing `@sandstack/neuron` into your file.

```javascript
import { Neuron } from "@sandstack/neuron";

/* Instantiate state */
const pokemon = new Neuron("Pikachu");

/* Read state */
pokemon.getRef(); //Pikachu

/* Update state */
pokemon.set("Mewtwo");
pokemon.getRef(); //Mewtwo

/* Listen for store updates */
pokemon.effect(() => {
  //When this state changes do something
});
```

![Neuron Global State Manager - React](https://sandstack.dev/neuron-react-banner.png "a title")

## React Neuron Example

Neuron has first class support for React. You can use the React specific package by importing `@sandstack/neuron/react` into your file.

```jsx
import {neuron} from '@sandstack/neuron/react'

/* Instantiate React hook */
const usePokemon = neuron("Pikachu");

/* Get and update state inside component with React hook */
function Comp(){
  const [pokemon, pokemonActions] = usePokemon();

  return(
    <>
    <p>My favorite Pokemon is: {pokemon}</p>
    <button onClick={() => pokemonActions.set("Mewtwo")}>
  </>
  )
}
```

Happy Coding!!
