### Extend Neuron with Modules

Modules like Persist allow you to extend Neuron features. In this case (only works in browser) state will be persisted between page refreshes. Modules must be applied by the `use` method on the `Store`. They must be set before any `add` methods.

```javascript
import Persist from @sandstack/neuron/modules/persist;

const Store = Neuron.Store();

Store.use(Persist);

Store.add({
    key: 'trainer',
    state: 'Ash Ketchum',
    features:{
        persist: true
    }
});

```
