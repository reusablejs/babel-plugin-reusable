const methodsMap = {
  reuseState: 1,
  reuseMemo: 2,
  reuseReducer: 2,
  reuseCallback: 2,
  memo: 2
}


function fillMissingArguments(reuseMethodArgumentsLength, argumentsLength, path, t) {
  const missingArguments = reuseMethodArgumentsLength - argumentsLength;

  // fill missing arguments
  [...Array(missingArguments).keys()].forEach(() => {
    path.node.arguments.push(t.Identifier('undefined'))
  })
}

function handleArrayPattern(t, variableDeclaration, reuseMethodArgumentsLength, path, argumentsLength) {
  if (t.isArrayPattern(variableDeclaration.node.id) && variableDeclaration.node.id.elements.length > 0) {
    const varName = variableDeclaration.node.id.elements[0].name;

    fillMissingArguments(reuseMethodArgumentsLength, argumentsLength, path, t)

    // add debug argument
    path.node.arguments.push(
      t.StringLiteral(varName),
    )
  }
}

function handleIdentifier(t, variableDeclaration, path, argumentsLength, reuseMethodArgumentsLength) {
  if (t.isIdentifier(variableDeclaration.node.id)) {
    const varName = variableDeclaration.node.id.name

   fillMissingArguments(reuseMethodArgumentsLength, argumentsLength, path, t)

    path.node.arguments.push(
      t.StringLiteral(varName),
    )
  }
}

export default function (babel) {
  const { types: t } = babel;

  return {
    name: "reusable-babel-plugin",
    visitor: {
      CallExpression(path, state) {
        const methodName = path.node.callee.name;
        const argumentsLength = path.node.arguments.length;
        const reuseMethodArgumentsLength = methodsMap[methodName];

        if (reuseMethodArgumentsLength) {
          const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());

          if (argumentsLength > reuseMethodArgumentsLength) {
            // no need for transformation, already contains debug name
            return;
          }

          handleArrayPattern(t, variableDeclaration, reuseMethodArgumentsLength, path, argumentsLength);
          handleIdentifier(t, variableDeclaration, path, argumentsLength, reuseMethodArgumentsLength);
        }

        // if (methodName === 'reuseState' && argumentsLength === 1) {
        //   const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());
        //
        //   if (t.isArrayPattern(variableDeclaration.node.id) && variableDeclaration.node.id.elements.length > 0) {
        //     const varName = variableDeclaration.node.id.elements[0].name;
        //     path.node.arguments.push(
        //       t.StringLiteral(varName)
        //     )
        //   }
        // }
        //
        // if (methodName === 'reuseState' && argumentsLength === 0) {
        //   const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());
        //
        //   if (t.isIdentifier(variableDeclaration.node.id)) {
        //     const varName = variableDeclaration.node.id.name;
        //     path.node.arguments.push(t.Identifier("undefined"))
        //     path.node.arguments.push(
        //       t.StringLiteral(varName)
        //     )
        //   }
        // }
        //
        // if (methodName === 'memo' && argumentsLength >= 1 && argumentsLength < 3) {
        //   const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());
        //   const hasSecondArgument = argumentsLength > 1
        //
        //   if (t.isIdentifier(variableDeclaration.node.id)) {
        //     const varName = variableDeclaration.node.id.name;
        //     if (!hasSecondArgument) {
        //       path.node.arguments.push(t.Identifier("undefined"))
        //     }
        //     path.node.arguments.push(
        //       t.StringLiteral(varName)
        //     )
        //   }
        // }

      },
      ImportDeclaration(path) {
        const isReuse = path.node.source.value === 'reuseable';

        if (isReuse) {
          path.traverse({
            ImportSpecifier(path) {
              const importName = path.node.imported.name;
              const localName = path.node.local.name;
            }
          })
        }
      }
    }
  };
}
