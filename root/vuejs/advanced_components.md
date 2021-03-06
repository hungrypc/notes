# Advanced Component Usage

## Passing Content: The Suboptimal Solution
Say we have an App component and a Quote component that is rendered on App.
In the Quote component, have have a quote that we want to render on the the App, and want to render it dynamically. We've learned how to do this with props:

```vue
// Quote.vue
<template>
    <div>
        <p>{{ quote }}</p>
    </div>
</template>
<script>
    export default {
        props: ['quote']
    }
</script>


// App.vue
<template>
    <div>
        <app-quote :quote="some quote"></app-quote>
    </div>
</template>
<script>
    import Quote from './Quote.vue'

    export default {
        components: {
            'app-quote': Quote
        }
    }
</script>
```
But what if we want to pass some multi line html code? We can use Slots

## Passing Conent with Slots
```vue
// Quote.vue
<template>
    <div>
        <slot></slot>   // SLOT
    </div>
</template>
<script>
    export default {
        props: ['quote']
    }
</script>


// App.vue
<template>
    <div>
        <app-quote>
            <h2>The Quote</h2>  // PASSING TO SLOT
            <p>some quote</p>
        </app-quote>
    </div>
</template>
<script>
    import Quote from './Quote.vue'

    export default {
        components: {
            'app-quote': Quote
        }
    }
</script>
```

## Using Multiple Slots (Named Slots)
```vue
// Quote.vue
<template>
    <div>
        <div>
            <slot name="title"></slot>
        </div>
        <div>
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['quote']
    }
</script>


// App.vue
<template>
    <div>
        <app-quote>
            <h2 slot="title">The Quote</h2> 
            <p slot="content">some quote</p>
        </app-quote>
    </div>
</template>
<script>
    import Quote from './Quote.vue'
    export default {
        components: {
            'app-quote': Quote
        }
    }
</script>
```

## Default Slots and Slot Defaults
What if only one slot is named, and the other is not? Vue treats the unnamed slot as the default slot. So whatever doesn't have a slot assignment will render in the default slot. 

What about an extra slot where we're not sure whether we'll assign something to it? We can actually set some default content that will be replaced once we give the slot something to render in it:

```vue
// Quote.vue
<template>
    <div>
        <div>
            <slot name="title"></slot>
            <slot name="subtitle">this will be replaced later</slot>
        </div>
        <div>
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['quote']
    }
</script>


// App.vue
<template>
    <div>
        <app-quote>
            <h2 slot="title">The Quote</h2> 
            <p>some quote</p>
        </app-quote>
    </div>
</template>
<script>
    import Quote from './Quote.vue'
    export default {
        components: {
            'app-quote': Quote
        }
    }
</script>
```

## Switching Multiple Components with Dynamic Components
```vue
// App.vue
<template>
    <div>
        <button @click="selectedComponent = 'appQuote'">Quote</button>
        <button @click="selectedComponent = 'appAuthor'">Author</button>
        <button @click="selectedComponent = 'appNew'">New</button>
        <p>{{ selected Component }}</p>
        <component :is="selectedComponent"></component> 
        // THIS IS WHERE WE DYNAMICALLY ADD COMPONENTS
    </div>
</template>
<script>
    import Quote from './Quote.vue'
    import Author from './Author.vue'
    import New from './New.vue'

    export default {
        data() {
            return {
                quoteTitle: 'The Quote',
                selectedComponent: 'appQuote'
            }
        },
        components: {
            appQuote: Quote,
            appAuthor: Author,
            appNew: New
        }
    }
</script>
```
This allows us to dynamically replace a part in our template with different components triggered by button clicks and stored in a property which is bound by the `:is` keyword.

The component gets destroyed and recreated whenever it is rendered through this way. 

## Keeping Dynamic Components Alive
To keep our component from getting destroyed when replaced dynamically, we can use `<keep-alive></keep-alive>`. This allows us to preserve the state.
```vue
// App.vue
<template>
    <div>
        <button @click="selectedComponent = 'appQuote'">Quote</button>
        <button @click="selectedComponent = 'appAuthor'">Author</button>
        <button @click="selectedComponent = 'appNew'">New</button>
        <p>{{ selected Component }}</p>
        <keep-alive>
            <component :is="selectedComponent"></component> 
        </keep-alive>
    </div>
</template>
<script>
    import Quote from './Quote.vue'
    import Author from './Author.vue'
    import New from './New.vue'

    export default {
        data() {
            return {
                quoteTitle: 'The Quote',
                selectedComponent: 'appQuote'
            }
        },
        components: {
            appQuote: Quote,
            appAuthor: Author,
            appNew: New
        }
    }
</script>
```

## Dynamic Component Lifecycle Hooks
Because we're using keep-alive, we lose the destroy lifecycle hook. What if we want to react to change in navigation so that another component gets loaded?

```vue
// New.vue
<template>
    <div>
        <h3>New Quote</h3>
    </div>
</template>
<script>
    import Quote from './Quote.vue'
    export default {
        destroyed() {
            console.log('destroyed') // destroy lifecycle hook
        },
        deactivated() {
            // executed when we are on the component and then load another component
            console.log('deactivated')
        },
        activated() {
            // executes whenever we load the dynamic component
            console.log('activated')
        }
    }
</script>
```






























    