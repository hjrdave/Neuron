## Slices

Slices allow deep nested objects to be retrieved and updated easily, with the standard Neuron getter and setter api.

Below we have a Store item that has a deep nested object passed to it.

```jsx
<State
    name={'person'}
    state={{
        name: 'Bob',
        meta: {
            age: 30,
            job: {
                title: 'Developer'.
                salary: 90,000
            }
        }
    }}
/>
```

We want to be able to retrieve certain properties and set those properties with out complicated object spreading. We can use slices to do this. Example below:

```jsx
function Comp(){

    const [name, setName] = useNeuron((store) => store.person.name);
    const [title, setTitle] = useNeuron((store) => store.person.meta.job.title);
    const [salary, setSalary] = useNeuron((store) => store.person.meta.job.salary);

    return(
        <p>My name is {name}</p>
        <p>I am a {title}</p>
        <p>I make {salary} a year.</p>
        <button onClick={() => setName('Jim')}>Change Name</button>
        <button onClick={() => setTitle('Designer')}>Change Title</button>
        <button onClick={() => setSalary(60000)}>Change Salary</button>
    );
}
```
