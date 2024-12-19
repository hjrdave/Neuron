# Getting Started

Install the `@sandstack/neuron` package in your project.

```bash
npm install @sandstack/neuron

yarn add @sandstack/neuron
```

You can also include a cdn in your html file.

```html
<script src="https://unpkg.com/@sandstack/neuron@0.0.0-alpha.44/umd/index.js"></script>
```

## JS Imports

Neuron can be imported into your js file through ESM Imports or CommonJS.

```javascript
import { createStore } from "@sandstack/neuron";

const { createStore } = require("@sandstack/neuron");
```

## Choose Neuron Flavor

Neuron was made with the thought of a totally customizable global state management system that could be used for specific needs of the developer despite what JS framework or library they use. As of now there are two flavors you can choose from VanillaJS and React. Click the one that you want to use below.

[VanillaJS](vanilla/create-store)  
This is the barebones library that can be used in any js application or html file. You will have to use `onDispatch` to setup your own reactive state needs.

[React](react/about)
This is a wrapper around VanillaJS Neuron. It uses a React centric api that includes components and hooks to manage global state in your React app.

Happy hacking!
