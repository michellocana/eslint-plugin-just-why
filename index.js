module.exports = {
  rules: {
    'no-todo-comment': require('./src/rules/NoTodoComment'),
    'no-if-else': require('./src/rules/NoIfElse'),
    'no-object-literal': require('./src/rules/NoObjectLiteral')
  }
}
