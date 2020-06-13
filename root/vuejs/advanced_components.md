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
































    