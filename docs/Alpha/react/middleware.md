# Middleware

Middleware is logic that runs at different times during the store dispatch process. This allows for state to be manipulated, interrogated, logged, and even cancelled during a dispatch. Middleware is set on a store item. Any time the store item gets a dispatch, the appropriate middleware will run. And example middleware is below:

```jsx
<State
  name={"fruit"}
  state={"apple"}
  onRun={(payload) => {
    console.log("The dispatched state is: ", payload.state);
  }}
/>
```

## Types

All three types of middleware have access to the `payload` object. This object has properties and methods that allow the middleware to interrogate, manipulate, or cancel the dispatch. You may use all three types on one store item. Learn the payload api [here](vanilla/middleware#payload).

### OnLoad

Only fires once as the store is instantiated. It will not run again, even if a dispatch happens.

```jsx
<State
  name={"trainer"}
  state={"ash"}
  onLoad={(payload) => {
    console.log("I fire only once when the store first instantiates");
  }}
/>
```

### OnRun

Fires every time a dispatch is sent. When this middleware resolves, the dispatch will also resolve and the store will be updated.

```jsx
<State
  name={"trainer"}
  state={"ash"}
  onRun={(payload) => {
    if (payload.state === "gary") {
      console.log("Gary is lame!");
      payload.cancelDispatch();
    } else {
      console.log(payload.state, " is amazing!");
    }
  }}
/>
```

### OnCallback

Fires only when all other middleware and the dispatch resolves. This will fire even if a dispatch is cancelled.

```jsx
<State
  name={"trainer"}
  state={"ash"}
  onCallback={(payload) => {
    console.log("The store has been updated....");
  }}
/>
```
