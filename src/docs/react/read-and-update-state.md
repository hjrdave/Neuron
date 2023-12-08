3. Get and Set state with Store hook

```jsx

function Comp(){

    const [fruit, setFruit] = useNeuron('fruit');
    const [car, setCar] = useNeuron('car');

    return(
        <p>This is my favorite fruit, {fruit}</p>
        <p>This is my favorite car, {car}</p>
        <button onClick={() => setFruit('orange')}>Change Fruit</button>
        <button onClick={() => setCar('Ford')}>Change Car</button>
    );
}

```

Alternatively to the magic string selector like `'fruit'`. You can also select state with an arrow function like this `(store) => store.fruit`.

```jsx
function Comp() {
  const [fruit, setFruit] = useNeuron((store) => store.fruit);
  const [car, setCar] = useNeuron((store) => store.car);
}
```
