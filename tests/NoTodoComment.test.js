const { RuleTester } = require('eslint')

const ruleTester = new RuleTester()

const NoTodoComment = require('../src/rules/NoTodoComment')

const { NO_TODO_COMMENT_ERROR_MESSAGE } = require('../src/messages')

ruleTester.run('no-todo-comment', NoTodoComment, {
  valid: [
    {
      code: 'var todo = true'
    },
    {
      code: '// WordContainingTODO'
    },
    {
      code: '// some valid comment'
    },
    {
      code: '// to get x you need TO DO y'
    }
  ],

  invalid: [
    {
      code: '// TODO foo',
      errors: [{ message: NO_TODO_COMMENT_ERROR_MESSAGE }]
    },
    {
      code: '// todo foo',
      errors: [{ message: NO_TODO_COMMENT_ERROR_MESSAGE }]
    }
  ]
})
