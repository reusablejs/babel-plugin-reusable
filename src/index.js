import { transformArrayPattern, transformFallback, transformIdentifier } from './transformers';

const methodsMap = {
  reuseState: 1,
  reuseMemo: 2,
  reuseReducer: 2,
  reuseCallback: 2,
  reuseRef: 1,
  Memo: 2,
  reuseEffect: 2
}

const validImportNames = [
  'reusable',
  'reusable/macro'
];

export default function (babel) {
  const { types: t } = babel;

  return {
    name: "reusable-babel-plugin",
    visitor: {
      CallExpression(path, state) {
        const methodName = path.node.callee.name;
        const argumentsLength = path.node.arguments.length;

        state.file.path.traverse({
          ImportDeclaration(importDeclarationPath) {
            const isReuse = validImportNames.includes(importDeclarationPath.node.source.value);

            if (isReuse) {
              // TODO: remove nested traverse
              importDeclarationPath.traverse({
                ImportSpecifier(importSpecifierPath) {
                  const importName = importSpecifierPath.node.imported.name;
                  const localName  = importSpecifierPath.node.local.name;

                  // look for renamed imports
                  if (methodName === localName) {
                    const reuseMethodArgumentsLength = methodsMap[importName];

                    if (reuseMethodArgumentsLength) {
                      const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());

                      if (argumentsLength > reuseMethodArgumentsLength) {
                        // no need for transformation, already contains debug name
                        return;
                      }

                      const isArrayPatternTransformed = transformArrayPattern({
                        t: t,
                        variableDeclaration: variableDeclaration,
                        reuseMethodArgumentsLength: reuseMethodArgumentsLength,
                        path: path,
                        argumentsLength: argumentsLength
                      });
                      const isIdentifierTransformed = transformIdentifier({
                        t: t,
                        variableDeclaration: variableDeclaration,
                        path: path,
                        argumentsLength: argumentsLength,
                        reuseMethodArgumentsLength: reuseMethodArgumentsLength
                      });

                      // If it's none of the above fallback to looking for the parent unit
                      if (!isArrayPatternTransformed && !isIdentifierTransformed) {
                        transformFallback({
                          t: t,
                          variableDeclaration: variableDeclaration,
                          path: path,
                          argumentsLength: argumentsLength,
                          reuseMethodArgumentsLength: reuseMethodArgumentsLength,
                          methodName: importName
                        })
                      }
                    }
                  }
                }
              });
            }
          }
        });
      }
    }
  };
}
