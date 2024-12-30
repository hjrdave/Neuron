# Actions

Actions are methods are used to manipulate their respective Neuron state.

## Set

The `set` method is an action that by default is returned by the Neuron hook. It is the most common way to update state.

```jsx
const usePokemon = neuron("Magikarp");

function Comp(){

  const [pokemon, pokemonActions] = usePokemon();

  return(
    <p>{pokemon}</p>
    <button onClick={() => pokemonActions.set("Gyarados")}>Update</button>
  )
}
```

The `set` method also takes a predicate function that returns the _previous_ state.

```jsx
<button onClick={() => pokemonActions.set((prev) => `Shiny ${prev}`)}>
```

## Custom Actions

New actions can also be added to a Neuron. These actions have direct access to the Neuron `dispatch` method and help keep state updates DRY.

The Payload `state` property is mutable, which helps simplify state updates.

```jsx
const useCount = neuron(0, {
  actions: (dispatch) => {
    increment: () => dispatch((payload) => {
        payload.state = payload.prevState + 1
      }),
    decrement: () => dispatch((payload) => {
        payload.state = payload.prevState - 1
      })
  }
});

function Comp(){

  const [count, countActions] = useCount();

  return(
    <p>Pokedex: {Count}</p>
    <button onClick={() => countActions.increment()}>Increment</button>
    <button onClick={() => countActions.decrement()}>Decrement</button>
  )
}
```
