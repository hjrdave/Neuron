---
title: Introduction
description: The Neuron Global State Manager is a small, bare bones, framework agnostic library for managing client state in javascript user interfaces.
subnav:
  - Foo
  - Foo 2
  - Foo 3
  - Foo4
---

<img src='https://sandstack.dev/readme-neuron.png' alt='Neuron Global State Manager' style={{width: "100%"}}/>

# Introduction

The Neuron State Manager is a small, bare bones, framework agnostic library for managing client state in javascript user interfaces. It is simple enough to be used by itself or tailor fitted to be used with any UI Framework of your choice. The vanilla npm package is less than _2KBs_ and can be configured anyway to your tech stack or project needs.

## Motivation

I created Neuron because I wanted a light weight and unopinionated state management solution, that could be configured to work with any javascript framework. I also realized that many state management solutions in the wild currently, were convoluted, boilerplately and missing some key features that can make complicated UI components easier to make.

I decided to create my own solution for managing client state, and thus Neuron was born. It has module support for easily extending functionality, and handy devtools for state transparency. I also created a React specific version using vanilla Neuron as it's foundation. See [React](/react/about).

Vanilla example below.

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

React package example below.

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
