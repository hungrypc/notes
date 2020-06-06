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