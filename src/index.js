const validImportNames = [
  'reusable',
  'reusable/macro'
];

export default function (babel) {
  const { types: t } = babel;

  return {
    name: "reusable-babel-plugin",
    visitor: {
      Program: {
        enter(programPath, state) {
          programPath.traverse({
            CallExpression(path) {
              const methodName = path.node.callee.name;

              state.file.path.traverse({
                ImportDeclaration(importDeclarationPath) {
                  const isReuse = validImportNames.includes(importDeclarationPath.node.source.value);

                  if (isReuse) {
                    // TODO: remove nested traverse
                    importDeclarationPath.traverse({
                      ImportSpecifier(importSpecifierPath) {
                        const localName  = importSpecifierPath.node.local.name;

                        if (methodName === 'reusable' || methodName === localName) {
                          if (t.isArrowFunctionExpression(path.node.arguments[0])) {
                            const functionDeclaration = t.functionDeclaration(
                              path.parent.id,
                              path.node.arguments[0].params,
                              path.node.arguments[0].body
                            )
                            path.node.arguments[0] = functionDeclaration;
                          }
                        }

                        // look for renamed imports
                        if (methodName === localName) {

                        }
                      }
                    });
                  }
                }
              });
            }
          })
        }
      }
    }
  };
}
