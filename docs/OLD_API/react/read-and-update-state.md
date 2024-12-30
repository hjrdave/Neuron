# Read and Update State

Updating state in Neuron is very easy. The store returns a `useNeuron` hook that can be imported into components to get and set state values.

## Get and set state with useNeuron

Make sure the `useNeuron` hook is being exported from your store file.

```jsx
import { createStore } from "@sandstack/neuron/react";

export const { useNeuron } = createStore();
```

You can now import this hook into your component and call it. The hook takes a selector parameter that is the name of the state you are selecting. This hook is modeled after React's `useState` hook. The first parameter is the state, the second one is your setter function. See below.

```jsx
import { useNeuron } from "./AppStore.jsx";
function Comp() {
  const [pokemon, setPokemon] = useNeuron("pokemon");

  return (
    <>
      <p>Pokemon: {pokemon}</p>
      <button onClick={() => setPokemon("MewTwo")}>Update Pokemon</button>
    </>
  );
}
```

## Get state with slice selectors

Along with the magic string selectors you can select your state with an arrow function. This allows us to easily manage deep nested objects.

Example Store

```jsx
export const { State, useNeuron } = createStore();

export default function AppStore() {
  return (
    <>
      <State
        name={"pokemon"}
        state={{
          name: "pikachu",
          lv: 26,
          location: "kanto",
          evolutions: {
            thunderStone: "raichu",
            egg: "pichu",
          },
        }}
      />
    </>
  );
}
```

Example component with slice state

```jsx
function Comp(){

    const [name, setName] = useNeuron((state) => state.pokemon.name);
    const [location, setLocation] = useNeuron((state) => state.pokemon.location);
    const [egg, setEgg] = useNeuron((state) => state.pokemon.evolution.egg);

    return(
      <p>Name: {name}</p>
      <p>Location: {location}</p>
      <p>Egg Evolution: {egg}</p>
      <button onClick={() => setName('jigglypuff')}>Change Name</button>
      <button onClick={() => setName('johto')}>Change Location</button>
      <button onClick={() => setName('igglybuff')}>Change Egg Evolution</button>
    );
}
```

As you can see above, the sliced states are treated as separate neuron states. You can read and update them individually without having to use a spread operator or worry about overwriting the previous state. This is a powerful but simple way to handle deeply nested state.

- Note: You can uses slice selectors as a replacement for magic strings, even if you do not need state slices. They will work the same.
