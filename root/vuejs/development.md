# Moving to a "Real" Dev WorkFlow with Webpack and Vue CLI

## Installing Vue and Setup
```cli
sudo npm -g vue-cli

vue init <template-name> <project-name>
<!-- eg -->
vue init webpack-simple my_project
```

## Understanding .vue Files
FINALLY, we starting on vue files. Everything is in one place, template, script, style.
```vue
<template>
    <h1>Hello World</h1>
</template>

<script>
    export default {
    }
</script>

<style>
.someClass {
    font-size: 1rem;
}
</style>
```

```cli
npm run build
```

## An Introduction to Components
```html
<div id="app">
    <my-cmp></my-cmp>
    <my-cmp></my-cmp>
</div>
```

```js
Vue.component('my-cmp', {
    data(): {
        return {
            status: 'Critical'
        }
    },
    template: '<p>Server Status: {{ status }}</p>'
})

new Vue({
    el: '#app',
    data: {
        status: 'Critical'
    },
    template: '<p>Server Status: {{ status }}</p>'
})
```
With components, we gotta wrap data as a function so we're not interfering with our data. Now, we can reuse the component. Very bad explanation (as expected because maximilian is SHIT), go do more research on this.

## Storing Data in Components with the Data Method
```html
<div id="app">
    <my-cmp></my-cmp>
    <my-cmp></my-cmp>
</div>
```

```js
// globally registered
Vue.component('my-cmp', {
    data(): {
        return {
            status: 'Critical'
        }
    },
    methods: {
        changeStatus() {
            this.status = 'Normal'
        }
    },
    template: '<p><button @click="changeStatus">Change</button> {{ status }}</p>'
})

new Vue({
    el: '#app',    
})
```
So this is why data needs to be a function. If we have multiple things that source from the same vue component, they would interfere with each others' data, SO data has to be a method that returns the property so that they can work independently of each other. Btw, this is an example of a component being registered globally.

## Registering Components Locally and Globally
```html
<div id="app">
    <my-cmp></my-cmp>
    <my-cmp></my-cmp>
</div>
```

```js
let cmp = {
    data(): {
        return {
            status: 'Critical'
        }
    },
    methods: {
        changeStatus() {
            this.status = 'Normal'
        }
    },
    template: '<p><button @click="changeStatus">Change</button> {{ status }}</p>'
}

new Vue({
    el: '#app', 
    components: {
        'my-cmp': cmp   // locally registered component
    }   
})
```

## The Root Component in the App.vue File
```vue
<template>
    <p class="server">Server Status: {{ status }}</p>
</template>

<script>
    export default {
        data() {
            return {
                status: 'Critical'
            }
        }
    }
</script>

<style>
.server {
    font-size: 2rem;
}
</style>
```

## Creating a Component
Create a new file: Home.vue
```vue
// Home.vue
<template>
    <div>
        <p>Server Status: {{ status }}</p>
        <button @click="changeStatus">Change Status</button>
    </div>
</template>

<script>    
    export default {
        data() {
            return {
                status: 'Critical'
            }
        },
        methods: {
            changeStatus() {
                this.status = 'Normal'
            }
        }
    }
</script>
```
So how do we use this? Either globally:

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'

Vue.component('app-servers', Home)

new Vue({
    el: '#app',
    render: h => h(App)
})
```
Then on App.vue
```vue
// Home.vue
<template>
    <app-servers></app-servers>
</template>

<script>    
</script>
```
I don't understand why Max is showing it this way, it's so fucking useless  this guy is SUCH a bad udemy teacher, I'm never getting any courses from this fucker again. fucking frustrating. 

## Using Components

Create a new vue file: ServerStatus.vue
```vue
// ServerStatus.vue
<template>
    <div>
        <p>Server Status: {{ status }}</p>
        <button @click="changeStatus">Change Status</button>
    </div>
</template>

<script>    
    export default {
        data() {
            return {
                status: 'Critical'
            }
        },
        methods: {
            changeStatus() {
                this.status = 'Normal'
            }
        }
    }
</script>

// Home.vue
<template>
    <div>
        <app-server-status v-for="server in 5"></app-server-status>
    </div>
</template>

<script>   
    import ServerStatus from './ServerStatus.vue'

    export default {
        components: {
            'app-server-status': ServerStatus
        }
    } 
</script>
```
I only have so much patience for this piece of shit.

## Component Tags (Selectors)
```vue
// App.vue
<template>
    <div>
        <appHeader></appHeader>
        <app-servers></appservers>
        <app-footer></app-footer>
    </div>
</template>

<script>   
    import Header from './Header.vue'
    import Server from './Servers.vue'
    import Footer from './Footer.vue'

    export default {
        components: {
            appHeader: Header,
            'app-server': Server,
            'app-footer': Footer
        }
    } 
</script>
```

## Scoping Component Styles
You can scope styles by adding `scoped` in the style tag so styles are applied to html elements specific to that component. Which I find ridiculous because why not use classes and ids, which are the whole fucking POINT to them, this guy wants to make fucking custom html elements, is this the vue standard?? I guess it is?
