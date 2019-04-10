import { transformArrayPattern, transformEffector, transformIdentifier } from './transformers';

const methodsMap = {
  reuseState: 1,
  reuseMemo: 2,
  reuseReducer: 2,
  reuseCallback: 2,
  reuseRef: 1,
  Memo: 2
}

const parentNameMethodsMap = {
  reuseEffect: 2
};

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

                      transformArrayPattern(t, variableDeclaration, reuseMethodArgumentsLength, path, argumentsLength);
                      transformIdentifier(t, variableDeclaration, path, argumentsLength, reuseMethodArgumentsLength);
                    }

                    // useEffect
                    const specialMethodArgumentsLength = parentNameMethodsMap[importName];
                    if (specialMethodArgumentsLength) {
                      const variableDeclaration = path.findParent((path) => path.isVariableDeclarator());

                      if (argumentsLength > specialMethodArgumentsLength) {
                        // no need for transformation, already contains debug name
                        return;
                      }

                      transformEffector(variableDeclaration, path, specialMethodArgumentsLength, argumentsLength, t)
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
