### Listen for state changes

```javascript
Store.onDispatch((dispatchItem) => {
  if (dispatchItem.key === "name") {
    console.log(dispatchItem.state);
  }
});

//initial console.log output
//name: Ash Ketchum

//new console.log output
//name: Gary Oak
```
