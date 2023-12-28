# Read and Update State

Reading and updating state in Neuron is very easy. You must call the methods below to perform each task.

## Read state

Calling the `get` function will return the current value of the state. You must pass the correct `key` as a parameter and the store will use this to grab the correct state.

```javascript
const currentState = Store.get("name");
console.log(currentState);
//Ash Ketchum
```

## Update state

To update state you must call the `set` function. It takes two parameters, `key` and `newValue`.

```javascript
Store.set("name", "Gary Oak");
//The new state would be 'Gary Oak'
```

### Setting with the previous state

The `set` method can also take a predicate as its second parameter to grab the previous state value. Example below.

```javascript
Store.set("name", (prev) => `${prev} is lame.`);
//The new state would be 'Gary Oak is lame'
```
