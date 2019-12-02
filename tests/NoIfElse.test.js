const { RuleTester } = require('eslint')

const ruleTester = new RuleTester()

const NoIfElse = require('../src/rules/NoIfElse')

const { NO_IF_ELSE } = require('../src/messages')

ruleTester.run('no-if-else', NoIfElse, {
  valid: [
    {
      code: 'if (true) var foo = true'
    },
    {
      code: `
        if (true) {
          var foo = true
        } else if (false) {
          var foo = false
        }
      `
    }
  ],

  invalid: [
    {
      code: `
        if (Math.random()) {
          var foo = true
          var bar = true
        } else {
          var baz = false
        }
      `,
      errors: [{ message: NO_IF_ELSE }]
    },
    {
      code: `
        if (true) {
          var foo = true
          var bar = true
        } else {
          var baz = false
        }
      `,
      errors: [{ message: NO_IF_ELSE }]
    },
    {
      code: `
        if (foo) {
          var bar = true
          var baz = true
        } else {
          var qux = false
        }
      `,
      errors: [{ message: NO_IF_ELSE }]
    }
  ]
})
