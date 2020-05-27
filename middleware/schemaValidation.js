const Ajv = require('ajv')
const ajv = Ajv()

module.exports = inputSchema => {
  const validation = (req, res, next) => {
    const valid = ajv.validate(inputSchema, req.body)

    if (!valid) return res.send(ajv.errors)

    return next()
  }

  return validation
}