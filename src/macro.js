const { createMacro } = require("babel-plugin-macros");
const requireFromString = require("require-from-string");

function universalImportMacro({ references, state, babel }) {
  references.default.map((referencePath) => {
    if (referencePath.parentPath.type === "CallExpression") {
      const t = babel.types;
      const [query, condition] = referencePath.parentPath.get("arguments");
      const conditionString = condition.evaluate().value;

      const isRequire = requireFromString(
        `module.exports = ${conditionString}`
      );

      if (typeof isRequire !== "boolean") {
        throw new Error(
          `The second argument passed to \`universalImport\` must be a string in the form of ` +
            `\`determineBoolean();\`. Received \`${conditionString}\` instead, ` +
            `evaluating into \`${isRequire}\`.`
        );
      }

      referencePath.parentPath.replaceWith(
        t.callExpression(t.identifier(isRequire ? "require" : "import"), [
          query.node,
        ])
      );
    } else {
      throw new Error(
        `This is not supported: \`${referencePath
          .findParent(babel.types.isExpression)
          .getSource()}\`.`
      );
    }
  });
}

module.exports = createMacro(universalImportMacro);
