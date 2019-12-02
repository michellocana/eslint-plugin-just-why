const { RuleTester } = require('eslint')

const ruleTester = new RuleTester()

const NoObjectLiteral = require('../src/rules/NoObjectLiteral')

const { NO_OBJECT_LITERAL } = require('../src/messages')

ruleTester.run('no-object-literal', NoObjectLiteral, {
  valid: [
    {
      code: 'var foo = { bar: true, [bar]: true }',
      parserOptions: {
        ecmaVersion: 6
      }
    },
    {
      code: 'var foo = { bar: true, baz: qux }'
    }
  ],

  invalid: [
    {
      code: 'var foo = { "bar": true, baz: true }',
      errors: [{ message: NO_OBJECT_LITERAL }]
    },
    {
      code: 'var foo = { "bar": "value with trailing comma", }',
      errors: [{ message: NO_OBJECT_LITERAL }]
    }
  ]
})
