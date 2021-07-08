# universal-import.macro

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

Babel macro for automatic conversion of `import()` call expressions into `require()` based on a supplied code string.

## Why?

Because you want code splitting on the client side, but synchronous imports on the server side.

## How?

Add `universal-import.macro` to your dependencies. Replace `import()` with `universalImport()` from this package.

```js
// Before
import(`./assets/${name}.svg`);
```

```js
// After
import universalImport from "universal-import.macro";

universalImport(`./assets/${name}.svg`, `!!process.env.NO_DYNAMIC_IMPORTS`);
```

Depending on the `!!process.env.NO_DYNAMIC_IMPORTS` expression, Webpack will see a different import method.

```js
// process.env.NO_DYNAMIC_IMPORTS = false
import(`./assets/${name}.svg`);

// process.env.NO_DYNAMIC_IMPORTS = true
require(`./assets/${name}.svg`);
```

Replace `!!process.env.NO_DYNAMIC_IMPORTS` with some other code string which evaluates into a boolean at build-time. Since it can be any expression, you can use an IIFE for more complex conditions.

## Tests?

[Yes, some.](./src/__snapshots__/macro.test.js.snap)

## License?

MIT
