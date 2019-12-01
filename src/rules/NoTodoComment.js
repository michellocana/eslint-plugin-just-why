const { NO_TODO_COMMENT } = require('../messages')

module.exports = {
  meta: {
    docs: {
      description: 'Disallow TODO comments'
    }
  },

  create(context) {
    return {
      Program(node) {
        const comments = node.comments

        for (let comment of comments) {
          const isTodoComment = comment.value
            .toLowerCase()
            .split(/\s/g)
            .includes('todo')

          if (isTodoComment) {
            context.report({
              message: NO_TODO_COMMENT,
              loc: comment.loc
            })
          }
        }
      }
    }
  }
}
