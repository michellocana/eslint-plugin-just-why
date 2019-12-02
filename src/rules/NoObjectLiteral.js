const { NO_OBJECT_LITERAL } = require('../messages')

function fixMissingQuotesInObject(objectAsString) {
  const keyValues = objectAsString
    .replace(/{|}/g, '')
    .split(',')
    .map(a => a.trim())
    .filter(Boolean)
    .map(a => a.split(':'))
    .map(([key, value]) => {
      if (!key.startsWith('"')) {
        key = `"${key}"`
      }

      return `${key}: ${value}`
    })
    .join(',')

  return JSON.stringify(JSON.parse(`{${keyValues}}`), null, 2)
}

module.exports = {
  meta: {
    docs: {
      description: 'Disallow use object literal when it has no computed value'
    },
    fixable: true
  },

  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      ObjectExpression(node) {
        const hasComputedProperties = node.properties.some(propertyNode => propertyNode.computed)
        const hasNonLiteralValues = node.properties.some(propertyNode => propertyNode.value.type !== 'Literal')

        // Can't stringify object with computed properties or non-literal values
        if (hasComputedProperties || hasNonLiteralValues) {
          return
        }

        context.report({
          message: NO_OBJECT_LITERAL,
          loc: node.loc,
          fix(fixer) {
            const objectWithQuotes = fixMissingQuotesInObject(sourceCode.getText(node))
            const objectSingleLine = objectWithQuotes
              .split('\n')
              .map(line => line.trim())
              .join(' ')

            return fixer.replaceText(node, `JSON.parse('${objectSingleLine}')`)
          }
        })
      }
    }
  }
}
