# Using VueJS to Interact with the DOM

To use VueJS, import into the html [this](https://github.com/hungrypc/notes/tree/master/root/vuejs/vue.js) file. (Note: downloaded on June 6th 2020, newer versions can be found [here](https://vuejs.org/v2/guide/installation.html))

```html
<script src="vue.js"></script>
```
And we're set!

## Understanding VueJS Templates

```html
<div id="app">
    <p>{{ title }}</p>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        title: 'Hello World!'
    }
})
```

Vue creates a template based on our html code, stores it internally, and then basically uses the template to create the real html code, which is then rendered as the DOM. This allows us to use template syntax like `<p>{{ title }}</p>`. 

## How the VueJS Template Syntax and the Instance Work Together

```html
<div id="app">
    <p>{{ sayHello() }}</p>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        title: 'Hello World!'
    },
    methods: {
        sayHello() {
            return this.title
        }
    }
})
```
The DOM is able to access all things (data or methods) that we've put in the Vue instance. 

### Binding Attributes

`v-bind` tells vue not to use the regular html href, but bind to bind it. 

```html
<div id="app">
    <a v-bind:href="link">Google</a>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        link: 'http://google.com'
    }
})
```

### Using Directives

So `v-bind` is an example of a directive. 
>  A Directive is basically an instruction you put in your code.

### Disable Re-rendering with v-once 

```html
<div id="app">
    <h1 v-once>{{ title }}</h1>
    <p>{{ sayHello() }}</p>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        title: 'Hello World!'
    },
    methods: {
        sayHello() {
            this.title = 'Hello'
            return this.title
        }
    }
})
```
Because we're changing the value of `title` in `sayHello()`, vue would actually rerender anything that references `title` with our new value.
With `v-once`, we're telling vue to only render the content within the element once, meaning any change to that value will not be reflected on the element with that directive.

### How to Output Raw HTML

```html
<div id="app">
    <p v-html="finishedLink"></p>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        finishedLink: '<a href="http://google.com">Google</a>'
    },
})
```

`v-html` tells vue to actually render the html in the string provided. However, this exposes you to cross-site scripting attacks. 

## Listening to Events

`v-on` allows us to listen to an event.

```html
<div id="app">
    <button v-on:click="increment">Increment</button>
    <p>{{ counter }}</p>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        counter: 0
    },
    methods: {
        increment() {
            this.counter++
        }
    }
})
```

### Getting Data from the Event Object

Our instance methods are automatically passed event object arguments.

```html
<div id="app">
    <p v-on:mousemove="updateCoordinates">Mouse Coordinates: {{ x }}, {{ y }}</p>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        x: 0,
        y: 0
    },
    methods: {
        updateCoordinates(event) {
            this.x = event.clientX
            this.y = event.clientY
        }
    }
})
```

### Passing Our Own Arguments with Events 

```html
<div id="app">
    <button v-on:click="increment(2, $event)">Increment</button>
    <p>{{ counter }}</p>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        counter: 0
    },
    methods: {
        increment(step, event) {
            this.counter += step
            // we're not doing anything with event but this is just to show that this is possible
        }
    }
})
```

### Modifying an Event

```html
<div id="app">
    <p v-on:mousemove="updateCoordinates">Mouse Coordinates: {{ x }}, {{ y }}</p>
    <span v-on:mousemove.stop="">dead spot</span>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        x: 0,
        y: 0
    },
    methods: {
        updateCoordinates(event) {
            this.x = event.clientX
            this.y = event.clientY
        },
    }
})
```

This stops the updateCoordinate when hovering over dead spot. 

### Listening to Key Events

```html
<div id="app">
    <input type="text" v-on:keyup.enter.space="alertMe">
</div>
```

```js
new Vue({
    el: '#app',
    methods: {
        alertMe() {
            alert('Alert')
        }
    }
})
```
Fires an alert when space or enter key are released. 

## Writing JS Code in the Templates

```html
<div id="app">
    <button v-on:click="counter++">Increment</button>    
    <p>{{ counter }}</p>
    <p>{{ counter > 10 ? 'Greater than 10' : 'Smaller than 10' }}</p>
    <!-- as above, we can write valid js code -->
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        counter: 0
    },
    methods: {
        increment(step, event) {
            this.counter += step
        }
    }
})
```

## Using Two-Way-Binding

We saw how we can output data, and we saw how we can listen to events. What if we want to do both at the same time? We use `v-model`

```html
<div id="app">
    <input type="text" v-model="name">  
    <!-- so here, whenever we change the input, it will also update the name property -->
    <p>{{ name }}</p>    
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        name: 'Phil'
    },    
})
```

## Reacting to Changes with Computed Properties

```html
<div id="app">
    <button v-on:click="increment">Increment</button>    
    <p>{{ counter }}</p>
    <p>{{ output }} | {{ result() }}</p>
    <!-- we can access output like a regular property rather than as a function -->
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        counter: 0,
        result: ''
    },
    computed: {
        // computed properties doesn't execute every render unless 
        output() {
            return this.counter > 5 ? '> 5' : '< 5'
            // the result is cached
            // it doesn't need to recalculate when there's no need to
        }
    },
    methods: {
        result() {
            // versus this, this executes every render
            return this.counter > 5 ? '> 5' : '< 5'
        },
        increment(step, event) {
            this.counter++            
        }
    }
})
```
Very shitty explanation. This lecturer sucks.

## An Alternative to Computed Properties: Watching for Changes

```html
<div id="app">
    <button v-on:click="increment">Increment</button>    
    <p>{{ counter }}</p>
    <p>{{ result() }}</p>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        counter: 0,
        result: ''
    },
    watch: {
        counter: function(value) {
            // run this function whenever something happens to counter
            let vm = this
            setTimeout(function() {
                vm.counter = 0
            }, 2000)
        }
    },
    methods: {
        result() {
            // versus this, this executes every render
            return this.counter > 5 ? '> 5' : '< 5'
        },
        increment(step, event) {
            this.counter++            
        }
    }
})
```
It's recommended to use computed properties, it's more optimized. 

## Saving Time with Shorthands

Here're a couple shorthands:

- Intsead of `v-on:click`, we can use `@click` 
- Instead of `v-bind:href`, we can use `:href`

```html
<div id="app">
    <button @click="changeLink">Change Link</button>
    <a :href="link"></a>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        link: 'http://google.com'
    },    
    methods: {
        changeLink() {
            this.link = 'http://apple.com'
        }
    }
})
```






















