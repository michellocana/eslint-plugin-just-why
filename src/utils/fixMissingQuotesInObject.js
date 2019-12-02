module.exports = function fixMissingQuotesInObject(objectAsString) {
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
