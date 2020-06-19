# React and TypeScript

## Setup
create-react-app can set up a react app with ts:

```cli
npx create-react-app my-app --typescript

npm install --save typescript @types/node @types/react @types/react-dom
@types/jest
```

```ts
// App.tsx
import React from 'react';

const App: React.FC = () => {
    // FC stands for FunctionComponent
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
```

## Passing Props
```ts
// App.tsx
const App: React.FC = () => {
  const todos = [
    {
      id: 't1',
      text: 'first todo'
    }
  ]

  return (
    <div className="App">
      <TodoList items={todos}/>
    </div>
  );
}


// TodoList.tsx
import React from 'react'

interface TodoListProps {
  items: {id: string, text: string}[]
}

const TodoList: React.FC<TodoListProps> = props => {
  
  return (
    <React.Fragment>
      <ul>
        {props.items.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </React.Fragment>
  )
}
```


[Using Redux with TS](https://redux.js.org/recipes/usage-with-typescript)
[Using react-router-dom with TS](https://www.pluralsight.com/guides/react-router-typescript)
