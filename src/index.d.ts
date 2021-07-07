/**
 * `import()` which dynamically transforms into `require()` depending on a supplied code string.
 *
 * @example universalImport(`./assets/${name}.svg`, `Boolean(process.env.NO_DYNAMIC_IMPORTS)`)
 */
declare function universalImport(
  /** Path to import. Should be a valid first argument for both `require()` and `import()`. */
  path: string,
  /** * Code string which must evaluate into a boolean. If `true`, `require()` is used. */
  requireCodeString: string
): any;

export default universalImport;
