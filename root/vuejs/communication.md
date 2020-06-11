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

