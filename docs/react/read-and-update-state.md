# Read and Update State

Updating state in Neuron is very easy. The store returns a hook that can be used inside React components to get and set state values.

## Get and set state with a Neuron hook

Init your state by importing `neuron`.

```jsx
import { neuron } from "@sandstack/neuron/react";

const usePokemon = neuron("Trubbish");
```

You can now import this hook into your component and call it. This hook is modeled after React's `useState` hook. It returns a destructured array with two values.

- **state** - This is reactive state that triggers a rerender when it changes.
- **actions** - This is an object that containers CRUD methods for updating state. The default method for this is the `set` method. Custom actions can also be added. See here.

```jsx
const usePokemon = neuron("Trubbish");

function Comp() {
  const [pokemon, pokemonActions] = usePokemon();

  return (
    <>
      <p>Pokemon: {pokemon}</p>
      <button onClick={() => pokemonActions.set("MewTwo")}>
        Update Pokemon
      </button>
    </>
  );
}
```

## Get state with slice selectors

The Neuron hook can take one parameter called a **Slice Selector**. This allows for deeply nested objects to be read and updated much easier then having to use a spread operator and `set` method to update state.

Example Store

```jsx
const usePokemon = neuron({
  name: "pikachu",
  lv: 26,
  location: "kanto",
  evolutions: {
    thunderStone: "raichu",
    egg: "pichu",
  },
});
```

Example component with slice state

```jsx
function Comp(){

    const [name, {setSlice: setName}] = usePokemon((pokemon) => pokemon.name);
    const [location, {setSlice: setLocation}] = usePokemon((pokemon) => pokemon.location);
    const [egg, {setSlice: setEgg}] = usePokemon((pokemon) => pokemon.evolution.egg);

    return(
      <p>Name: {name}</p>
      <p>Location: {location}</p>
      <p>Egg Evolution: {egg}</p>
      <button onClick={() => setName('jigglypuff')}>Change Name</button>
      <button onClick={() => setLocation('johto')}>Change Location</button>
      <button onClick={() => setEgg('igglybuff')}>Change Egg Evolution</button>
    );
}
```

As you can see above, the sliced states are treated as separate neuron states. You can read and update them individually without having to use a spread operator or worry about overwriting the previous state. This is a powerful but simple way to handle deeply nested state.

For those using Typescript all slice states are type safe.
