# Modules and Namespaces

Namespaces and File Bundling is a syntax feature that allow you to group code so that you can import them into other files.

Modules (ES6 imports and exports).


## Working with NameSpaces

```ts
// dragdrop-interfaces.ts
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
  }
  
  export interface DragTarget {
    dragOverHandler(event: DragEvent): void
    dropHandler(event: DragEvent): void
    dragLeaveHandler(event: DragEvent): void
  }
}

// app.ts
/// <reference path="dragdrop-interfaces.ts" />
namespace App {
    // all the code
}
```
`///` allows us to import the namespace

```js
// .tsconfig
{
  "compilerOptions": {
    // ...
    "module": "amd", 
    // ...
    "outFile": "./dist/bundle.js",   // have to comment this in for imports to work
    // ...
}
```

```html
<script src="dist/bundle.js" defer></script>
```

## Using ES Modules
Namespaces are nice, but they're still not the BEST way to organize our files.

```js
// use regular js import export (remove namespaces)
import { ProjectInput } from './components/project-input.js'
import { ProjectList } from './components/project-list.js'

// .tsconfig
{
  "compilerOptions": {
    // ...
    "module": "es2015", 
    // ...
    // "outFile": "./dist/bundle.js",   // must comment this out now
    // ...
}
```

```html
<script src="dist/app.js" type="module"></script>
```






















