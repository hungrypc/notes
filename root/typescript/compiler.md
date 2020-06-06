# The TypeScript Compiler and its Configuration

### The Watch Mode
Telling TS to watch a file for any changes

```cli
tsc app.ts --w
```

### Compiling Multiple Files

```cli
tsc --init
<!-- this creates a tsconfig.json -->

<!-- now, all we have to type to compile all ts files within the folder: -->
tsc
```

### Including and Excluding Files

The tsconfig file basically lets us configure what we want to do with our files. Within it, we can do this:

```js
// tsconfig.json
"exclude": [    // : exclude the following files during compilation
  "analytics.ts", 
  "*.dev.ts"    // : exclude all files with .dev.ts
],
"include": [    // : ONLY include the following files during compilation
  "app.ts"     
]
```

### Setting a Compilation Target

Within the tsconfig file, we have "compilerOptions". This allows us to tell ts HOW we want ts to compile our files. For example, we can tell ts whether to compile the code into es5 (default) or es6.

### Understanding TypeScript Core Libs

Lib is an option that allows us to specify which default objects and features ts knows.

### More Configuration and Compilation Options

Just a few examples of what we have.

- allowJs
  + Allows js files to be compiled along with ts
- checkJs
  + Checks js files to report potential errors but doesn't compile
- jsx
  + Specify jsx code generation
- sourceMap
  + Helps us with debugging and development - connects js files with input files (useful in dev tools)
- outDir
  + The bigger our project gets, the more we want to organize our files - we can tell ts where the output files that we stored are/should be
- rootDir
  + Tells ts where the input files are stored in - retains folder structure in the outDir location
- noEmit
  + If you just want to check if the files are correct but don't want to write any js files
- noEmitOnError
  + Tells ts not to write any js files if there are any errors
















