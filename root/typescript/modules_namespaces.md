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

```json
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


