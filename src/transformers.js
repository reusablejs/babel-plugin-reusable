export function fillMissingArguments({ reuseMethodArgumentsLength, argumentsLength, path, t }) {
  const missingArguments                                       = reuseMethodArgumentsLength - argumentsLength;

  // fill missing arguments
  [...Array(missingArguments).keys()].forEach(() => {
    path.node.arguments.push(t.Identifier('undefined'))
  })
}

export function transformArrayPattern({ t, variableDeclaration, reuseMethodArgumentsLength, path, argumentsLength }) {
  if (t.isArrayPattern(variableDeclaration.node.id) && variableDeclaration.node.id.elements.length > 0) {
    const varName = variableDeclaration.node.id.elements[0].name

    fillMissingArguments({
      reuseMethodArgumentsLength: reuseMethodArgumentsLength,
      argumentsLength: argumentsLength,
      path: path,
      t: t
    })

    // add debug argument
    path.node.arguments.push(
      t.StringLiteral(varName),
    )

    return true
  }

  return false
}

export function transformIdentifier({ t, variableDeclaration, path, argumentsLength, reuseMethodArgumentsLength }) {
  if (t.isExpressionStatement(path.parentPath.node)) {
    return false
  }

  if (t.isIdentifier(variableDeclaration.node.id)) {
    const varName = variableDeclaration.node.id.name

    fillMissingArguments({
      reuseMethodArgumentsLength: reuseMethodArgumentsLength,
      argumentsLength: argumentsLength,
      path: path,
      t: t
    })

    path.node.arguments.push(
      t.StringLiteral(varName),
    )

    return true
  }
  return false
}

export function transformFallback({ t, variableDeclaration, path, argumentsLength, reuseMethodArgumentsLength, methodName }) {
  const parentUnitName = variableDeclaration.node.id.name
  const effectIndex    = (path.parentPath.parentPath.node.body || []).indexOf(path.parentPath.node)

  if (parentUnitName && effectIndex !== -1) {
    fillMissingArguments({
      reuseMethodArgumentsLength: reuseMethodArgumentsLength,
      argumentsLength: argumentsLength,
      path: path,
      t: t
    })
    path.node.arguments.push(
      t.StringLiteral(`${parentUnitName} ${methodName} (${effectIndex})`),
    )

    return true
  }

  return false
}
