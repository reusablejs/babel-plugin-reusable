export function fillMissingArguments(reuseMethodArgumentsLength, argumentsLength, path, t) {
  const missingArguments = reuseMethodArgumentsLength - argumentsLength;

  // fill missing arguments
  [...Array(missingArguments).keys()].forEach(() => {
    path.node.arguments.push(t.Identifier('undefined'))
  })
}

export function transformArrayPattern(t, variableDeclaration, reuseMethodArgumentsLength, path, argumentsLength) {
  if (t.isArrayPattern(variableDeclaration.node.id) && variableDeclaration.node.id.elements.length > 0) {
    const varName = variableDeclaration.node.id.elements[0].name;

    fillMissingArguments(reuseMethodArgumentsLength, argumentsLength, path, t)

    // add debug argument
    path.node.arguments.push(
      t.StringLiteral(varName),
    )
  }
}

export function transformIdentifier(t, variableDeclaration, path, argumentsLength, reuseMethodArgumentsLength) {
  if (t.isIdentifier(variableDeclaration.node.id)) {
    const varName = variableDeclaration.node.id.name

    fillMissingArguments(reuseMethodArgumentsLength, argumentsLength, path, t)

    path.node.arguments.push(
      t.StringLiteral(varName),
    )
  }
}

export function transformEffector(variableDeclaration, path, specialMethodArgumentsLength, argumentsLength, t) {
  const parentUnitName = variableDeclaration.node.id.name
  const effectIndex = (path.parentPath.parentPath.node.body || []).indexOf(path.parentPath.node);

  if (parentUnitName && effectIndex !== -1) {
    fillMissingArguments(specialMethodArgumentsLength, argumentsLength, path, t)
    path.node.arguments.push(
      t.StringLiteral(`${parentUnitName} Effect (${effectIndex})`),
    )
  }
}
