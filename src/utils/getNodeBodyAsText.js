module.exports = function getNodeBodyAsText(node, sourceCode) {
  return node.type === 'BlockStatement'
    ? node.body.map(childNode => sourceCode.getText(childNode)).join('\n')
    : sourceCode.getText(node)
}
