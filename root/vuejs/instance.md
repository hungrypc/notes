# Understanding the VueJS Instance

## Some Basics about the VueJS Instance
The Vue Instance is the middleman between out DOM and our business logic. We pack all our logic in the vue instance. 

Now, there are two things we haven't touched on yet. First, can we have multiple vue instances? Second, can we access our vue instance from outside?

## Using Multiple Vue Instances
Note that within an instance, you can only access the properties of that specific instace with `this`.

```html
<div id="app1">
    <h1>{{ title }}</h1>
    <button @click="show">Show Paragraph</button>
    <p v-if="showParagraph">This isn't always visible</p>
</div>

<div id="app2">
    <h1>{{ title }}</h1>
</div>
```

```js
new Vue({
    el: '#app1',
    data: {
        title: 'The VueJS Instance',
        showParagraph: false
    },
    methods: {
        show() {
            this.showParagraph = true
        }
    },
})

new Vue({
    el: '#app2',
    data: {
        title: 'The Second Instance'
    }
})
```

## Accessing the Vue Instance from the Outside
```html
<div id="app1">
    <h1>{{ title }}</h1>
    <button @click="show">Show Paragraph</button>
    <p v-if="showParagraph">This isn't always visible</p>
</div>

<div id="app2">
    <h1>{{ title }}</h1>
    <button @click="onChange">Change something on Vue 1</button>
</div>
```

```js
let vm1 = new Vue({
    el: '#app1',
    data: {
        title: 'The VueJS Instance',
        showParagraph: false
    },
    methods: {
        show() {
            this.showParagraph = true
        }
    },
})

let vm2 = new Vue({
    el: '#app2',
    data: {
        title: 'The Second Instance'
    },
    methods: {
        onChange() {
            vm1.title = 'Changed'
        }
    }
})

setTimeout(() => {
    vm2.title = "Changed by timer"
}, 10000)
```
However, if there's a lot of communication going on between two instances, you probably want to set those instances up as one instance. 

## How VueJS manages your Data and Methods
Behind the scenes, when creating an instance, vue takes the data properties and methods we set and use them as native properties on the vue instance itself. It also sets up a watcher for each of these properties so it will recognize whenever any of these are changed to update the DOM. 

So we're able to manipulate an instance's property from the outside, but we can't create new properties from the outside. Vue creates getters and setters for things we've passed through the constructor, and therefore are able to watch for these properties, but properties added from the outside aren't passed through the consttructor and so won't have a getter/setter for it. 

## A Closer look at $el and $data
These are refs.
> $el refers to our html code of that instance.
> $data holds our data properties

The point here is that Vue doesn't create it's own enclosed world. It's normal js, it lives in js, and it's able to interact with js around it.

## Placing $refs and Using them on Templates
Ref is kind of like a key.

```html
<div id="app1">
    <h1 ref="heading">{{ title }}</h1>
    <button @click="show" ref="myButton">Show Paragraph</button>
    <p v-if="showParagraph">This isn't always visible</p>
</div>
```

```js
let vm1 = new Vue({
    el: '#app1',
    data: {
        title: 'The VueJS Instance',
        showParagraph: false
    },
    methods: {
        show() {
            this.showParagraph = true
            console.log(this.$refs)  // logging all elements with a ref tag
            this.$refs.myButton.innerText = 'Test'
            // we're also able to access html elements like this
        }
    },
})

vm1.$refs.heading.innerText = "something else"
// this however doesn't really overwrite 
// here, we're changing the data in the DOM, but we're not really changing the js
// so when vue rerenders, it takes its old template and renders based on that
```

## Mounting a Template 
We already know that vue takes the html and creates a template to use to render to the DOM. It's able to change this template if it needs to whenever any changes are made. Regarding this template, it automatically picks the html code contained in element we tell the instance to be responsible for. 

However, we can also do this:
```html
<div id="app1">
    <h1 ref="heading">{{ title }}</h1>
    <button @click="show" ref="myButton">Show Paragraph</button>
    <p v-if="showParagraph">This isn't always visible</p>
</div>
<div id="app3"></div>
```

```js
let vm1 = new Vue({
    // el: '#app1',     // so without this
    data: {
        title: 'The VueJS Instance',
        showParagraph: false
    },
    methods: {
        show() {
            this.showParagraph = true
            console.log(this.$refs)  // logging all elements with a ref tag
            this.$refs.myButton.innerText = 'Test'
            // we're also able to access html elements like this
        }
    },
})

vm1.$mount()         // but can do this
vam1.$mount('#app1') // or this

// we can create a vue instance with its own template
let vm3 = new Vue({
    template: '<h1>Hello</h1>',
})

vm3.$mount('#app3')
```

## Using Components
What if we wanted to make a vue template reusable?

```html
<div class="hello"></div>
<div class="hello"></div>
<div class="hello"></div>
```

```js
Vue.component('.hello', {
    template: '<h1>Hello</h1>' // replaces all els with class="hello"
})
```
This is a really basic basic intro to components, we'll explore better uses later.

## How VueJS Updates the DOM
Each property we set up has its own watcher, created by vue for us. It would be cumbersome to update the DOM every time one thing changes, so we actually have a virtual DOM that is compared to the Vue instance to determine whether the real DOM needs to be updated, updating only the parts that have changed rather than the entire thing. 

## The Vue Instance Lifecycle
1. new Vue()
    - execute first lifecycle method: beforeCreate()
2. Initialize Data & Events
3. Instance created
    - calls created()
4. Compile template or el's template
5. beforeMount()
6. Replace el with compiled template
7. Mounted to DOM
From here, we have an ongoing cycle for updates
7. Mounted to DOM
8. Data changed
    - beforeUpdate()
9. Re-render DOM
    - updated()
7. Mounted to DOM
We also have the following for when the instance is destroyed
10. beforeDestroy()
11. Destroyed
    - destroyed()
