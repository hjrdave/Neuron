# Listen for State Changes

In Core Neuron state is not reactive out of the box as it is in JS frameworks/libraries like Svelte or React. It is up to the developer to make your state reactive. Neuron has a special method called `effect`. This method runs every time the Neuron is updated. It returns an updated `payload` object with state data every time it runs. You can run specific logic based on the payload or other data.

```javascript
const pokemon = new Neuron("Pikachu");
const trainer = new Neuron("Ash");

pokemon.effect((payload) => {
  //This runs when pokemon has been updated.
  console.log(payload.state);
});

trainer.effect((payload) => {
  //This runs when trainer has been updated.
  console.log(payload.state);
});
```

The `effect` method can be used to connect Neurons to native state solutions in other JS frameworks. It is the reason Neuron is an "agnostic" global state manager.
