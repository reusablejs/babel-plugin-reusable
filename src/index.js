export default function (babel) {
  const { types: t } = babel;

  return {
    name: "reusable-babel-plugin",
    visitor: {
      CallExpression(path, state) {
        const methodName = path.node.callee.name;
        const argumentsLength = path.node.arguments.length;

        if (methodName === 'reuseState' && argumentsLength === 1) {
          const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());

          if (t.isArrayPattern(variableDeclaration.node.id) && variableDeclaration.node.id.elements > 0) {
            console.log('is array');
            const varName = variableDeclaration.node.id.elements[0].name;
            path.node.arguments.push(
              t.StringLiteral(varName)
            )
          }
        }

        if (methodName === 'reuseState' && argumentsLength === 0) {
          const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());

          if (t.isIdentifier(variableDeclaration.node.id)) {
            const varName = variableDeclaration.node.id.name;
            console.log({ varName})
            path.node.arguments.push(t.Identifier("undefined"))
            path.node.arguments.push(
              t.StringLiteral(varName)
            )
          }
        }

        if (methodName === 'memo' && argumentsLength >= 1 && argumentsLength < 3) {
          const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());
          const hasSecondArgument = argumentsLength > 1

          console.log(variableDeclaration)
          if (t.isIdentifier(variableDeclaration.node.id)) {
            const varName = variableDeclaration.node.id.name;
            console.log({ varName})
            if (!hasSecondArgument) {
              path.node.arguments.push(t.Identifier("undefined"))
            }
            path.node.arguments.push(
              t.StringLiteral(varName)
            )
          }
        }

      },
      ImportDeclaration(path) {
        const isReuse = path.node.source.value === 'reuseable';

        if (isReuse) {
          path.traverse({
            ImportSpecifier(path) {
              const importName = path.node.imported.name;
              const localName = path.node.local.name;
              console.log({importName, localName});
            }
          })
        }
      }
    }
  };
}
