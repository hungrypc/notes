# Communication Between Components
Starter Code:

```vue
// User.vue
<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>

// UserDetail.vue
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
    </div>
</template>

<script>
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>


// UserEdit.vue
<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me!</p>
    </div>
</template>

<script>
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
```

## Using Props for Parent => Child Communication

```vue
// UserDetail.vue
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>User Name: {{ name }}</p>
    </div>
</template>
<script>
    export default {
        props: ['name']
    }
</script>


// User.vue
<template>
    <div class="component">
        //...
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail :name="name"></app-user-detail>
            </div>
            // HERE IS WHERE WE PASS PROPS ^^
            // ...
        </div>
    </div>
</template>
<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        data() {
            return {
                name: 'Max'
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>
```
basically `v-bind` but we're using shorthand

## Validating Props
If we want to validate props, we'll return it as an object instead of an array.

```vue
// UserDetail.vue
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>User Name: {{ name }}</p>
    </div>
</template>
<script>
    export default {
        props: {
            name: String
            // OR
            name: [String, Array]
            // ^ means it can be multiple types
            //OR
            name: {
                type: String,
                required: true,
                default: 'Max'
            }
        }
        // ...
    }
</script>
```
Note: if the type is an object, the default must be a function that returns an object.

## Using Custom Events for Child => Parent Communication

```vue
// UserDetail.vue
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>User Name: {{ name }}</p>
        <button @click="resetName">Reset</button>
    </div>
</template>
<script>
    export default {
        props: {
            name: String
        },
        methods: {
            resetName() {
                this.name = 'Default'
                this.$emit('resetName', this.name)
                // this emits an event
            }
        }
        // ...
    }
</script>

// so we emit an event when the button is clicked. we need to set a listener on the parent


// User.vue
<template>
    <div class="component">
        //...
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail :name="name" @resetName="name = $event"></app-user-detail>
                // setting up listener and what to do on event
            </div>
            // ...
        </div>
    </div>
</template>
// ...
```
Here's something interesting. For reference types, when you're passing a prop from a parent to the child, you're actually passing the REFERENCE to the memory in which this value is stored. SO, if you change the prop in the child, you're actually changing that value, which will also affect the parent. This is only the case with reference types, not the case with primitive types.

## Unidirectional Data Flow
So data can only be passed from parent to child, or from child to parent. We cannot pass data between siblings. If we want siblings to share some sort of data, we have to use pass callbanks as a prop, which will be used to pass data back to parent, and then parent to sibling.
 

























