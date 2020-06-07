# Using Conditionals and Rendering Lists

## Conditional Rendering with v-if

Using `v-if`. `v-else` automatically refers to the latest `v-if` in front of it

```html
<div id="app">
    <p v-if="show">Can you see me?</p>
    <p v-else>What about me?</p>
    <button @click="show = !show">Switch</button>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        show: true
    }
})
```

Vue 2.1 now has a `v-else-if` directive. Learn more about it [here](https://vuejs.org/v2/guide/conditional.html#v-else-if).

## Dont Detach it with v-show

`v-if` completely detaches the element. `v-show` acts in the same way, except it doesn't detach. It only hides or show.

## Rendering Lists with v-for

`v-for` allows us, like a normal for loop, to loop through an array and replicate the element on which it sits as often as needed, as well as pulling the information out from it.

```html
<div id="app">
    <ul>
        <li v-for="item in ingredients">{{ item }}</li>
    </ul>
</div>
```

```js
new Vue({
    el: '#app',
    data: {
        ingredients: ['meat', 'fruits', 'cookies']
    }
})
```

