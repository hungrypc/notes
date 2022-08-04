# dump

### extract param types from string literal
[blog post](https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/)

### refresher

function overload & generics
```ts
function firstEl(arr: string[]): string		// return string when arr: string[]
function firstEl(arr: number[]): number		// return number when arr: number[]
function(arr) {		// actual implementation
	return arr[0]
}

const string = firstEl(['a', 'b', 'c'])

/*** or ***/

function firstEl<T extends string | number>(arr: T[]): T {
	return arr[0]
}
```

### challenge
how can we get ts to type what's returned in req from just the path string?
```ts
app.get('/purchase/[shopId]/[itemId]/args/[...args]', (req) => {
	const { params } = req
	/**
	 * 			^^^
	 *  const params: {
	 * 		shopId: number
	 * 		itemId: number
	 * 		args: string[]
	 *  } 
	 */

	 const { foo } = req.params  // ts will complain
})
```

### solution

split path into union type by '/'
```ts
type Parts<Path> = Path extends `${infer PartA}/${infer PartB}`
	? PartA | Parts<PartB>
	: Path

type ABCD = Parts<'a/b/c/d'>	// type ABCD = 'a' | 'b' | 'c' | 'd'
```

use conditional and never to remove non param parts
```ts
type IsParam<Part> = Part extends `[${infer A}]` ? Part : never

type Purchase = IsParam<'purchase'>	 // type Purchase = never
type ShopId = IsParam<'[shopId]'>		 // type ShopId = '[shopId]'
````

combine with prev step
```ts
type IsParam<Part> = Part extends `[${infer A}]` ? Part : never
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
	? IsParam<PartA> | FilteredParts<PartB>
	: IsParam<Path>

type Params = FilteredParts<'/purchase/[shopId]/[itemId]/args/[...args]'>
// type Params = '[shopId]' | '[itemId]' | '[...args]'
```

remove bracket
```ts
type IsParam<Part> = Part extends `[${infer Param}]` ? Param : never
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
	? IsParam<PartA> | FilteredParts<PartB>
	: IsParam<Path>

type Params = FilteredParts<'/purchase/[shopId]/[itemId]/args/[...args]'>
// type Params = 'shopId' | 'itemId' | '...args'
```

build Params type
```ts
type Params<Path> = {
	[Key in FilteredParts<Path>]: unknown
}

type ParamObject = Params<'/purchase/[shopId]/[itemId]/args/[...args]'>
/**
 * type Params = {
 *	shopId: unknown
 * 	itemId: unknown
 *  '...args': unknown
 * }
 */
```

define map value
```ts
type ParamVal<Key> = Key extends `...${A}` ? string[] : number

type ShopId = ParamVal<'shopId'> // type ShopId = number
type Args = ParamVal<'...args'>  //	type Args = string[]
```

remove '...'
```ts
type RemovePrefix<Key> = Key extends `...${Name}` ? Name : Key

type Args = RemovePrefix<'...args'>  // type Args = 'args'
type ShopId = RemovePrefix<'shopId'> // type ShopId = 'shopId'
```

winner winner chicken dinner
```ts
type IsParam<Part> = Part extends `[${infer Param}]` ? Param : never
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
	? IsParam<PartA> | FilteredParts<PartB>
	: IsParam<Path>
type RemovePrefix<Key> = Key extends `...${Name}` ? Name : Key
type ParamVal<Key> = type ParamVal<Key> = Key extends `...${A}` ? string[] : number
type Params<Path> = {
	[Key in FilteredParts<Path> as RemovePrefix<Key>]: ParamVal<Key>
}

type ParamObject = Params<'/purchase/[shopId]/[itemId]/args/[...args]'>
/**
 * type ParamObject = {
 *	shopId: number
 * 	itemId: number
 *  args: string[]
 * }
 */

type CallbackFn<Path> = (req: { params: Params<Path> }) => void
function get<Path extends string>(path: Path, callback: CallbackFn<Path>): void {
	// impl.
}
```