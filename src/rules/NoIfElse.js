const { NO_IF_ELSE } = require('../messages')

const getNodeBodyAsText = require('../utils/getNodeBodyAsText')
const indent = require('../utils/indent')

module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of if/else'
    },
    fixable: true
  },

  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      IfStatement(node) {
        const hasElse = !!node.alternate
        const hasElseIf = hasElse && node.alternate.type === 'IfStatement'

        if (hasElse && !hasElseIf) {
          context.report({
            message: NO_IF_ELSE,
            loc: node.loc,
            fix(fixer) {
              const condition = sourceCode.getText(node.test)
              const consequentSuggestion = getNodeBodyAsText(node.consequent, sourceCode)
              const alternateSuggestion = getNodeBodyAsText(node.alternate, sourceCode)
              const indentationWidth = node.loc.start.column

              const fixedText = [
                `${condition} ? `,
                `${indent('(function() {', indentationWidth)}`,
                `${indent(consequentSuggestion, indentationWidth + 2)}`,
                `${indent(`}) : `, indentationWidth)}`,
                `${indent('(function() {', indentationWidth)}`,
                `${indent(alternateSuggestion, indentationWidth + 2)}`,
                `${indent(`})`, indentationWidth)}`
              ].join('\n')

              return fixer.replaceText(node, fixedText)
            }
          })
        }
      }
    }
  }
}
