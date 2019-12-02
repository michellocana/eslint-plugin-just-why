module.exports = function indent(str, width) {
  return str
    .split('\n')
    .map(line => ''.padStart(width + 2, ' ') + line)
    .join('\n')
}
