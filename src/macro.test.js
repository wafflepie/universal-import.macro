const { default: pluginTester } = require("babel-plugin-tester");
const plugin = require("babel-plugin-macros");

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
      import universalImport from "./macro"

      universalImport("./foo", "false")
    `,
    `
      import universalImport from "./macro"

      universalImport("./foo", "true")
    `,
    `
      import universalImport from "./macro"

      universalImport("./foo", "process.env.NODE_ENV === 'test'")
    `,
  ],
});
