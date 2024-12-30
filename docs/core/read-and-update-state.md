# Read and Update State

Reading and updating state in Neuron is very easy. You must call the methods below to perform each task.

## Read state

Calling the `getRef` method will return the current value of the state. This is a reference of the state.

```javascript
const name = new Neuron("Ash Ketchum");
name.getRef(); //Ash Ketchum
```

## Update state

To update state you must call the `set` method.

```javascript
name.set("Gary Oak");
name.getRef(); //Gary Oak
```

### Setting with the previous state selector

The `set` method can also take a predicate to grab the previous state value. Example below.

```javascript
name.set((prev) => `${prev} is lame.`);
name.getRef(); //Gary Oak is lame.
```
