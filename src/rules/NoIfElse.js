const { NO_IF_ELSE } = require('../messages')

module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of if/else'
    }
  },

  create(context) {
    return {
      IfStatement(node) {
        const hasElse = !!node.alternate
        const hasElseIf = hasElse && node.alternate.type === 'IfStatement'

        if (hasElse && !hasElseIf) {
          context.report({
            message: NO_IF_ELSE,
            loc: node.loc
          })
        }
      }
    }
  }
}
