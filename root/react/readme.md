# Intermediate React

[Course link](https://frontendmasters.com/courses/intermediate-react-v2/)

note dump for react. will try to avoid repeating already learned concepts.

# Basic Hooks

## useState

pretty simple, just allows us to create a state and setState.

## useEffect

first, the component renders, THEN useEffect gets called (like `componentDidMount()`). 

we add a `return () => {}` at the end of useEffect as a way of cleaning up when the component gets unmounted.

## useContext

context solves the problem of having to do prop drilling of passing parent to child, as well as covering things that redux would normally cover such as application level state
```jsx
const UserContext = createContext([
    {
        firstName: 'Bob',
        lastName; 'Bobberson',
        suffix: 1,
        email: 'bobbobbob@gmail.com',
    }, // shape of a hook
    obj => obj // updater/identity function
])

const Component = () => {
    const [user, setUser] = useContext(UserContext)

    return (
        <div>{user.firstName}</div>
    )
}