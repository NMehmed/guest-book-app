const createError = require('http-errors')
const expectedAuthorizationHeader = `Basic ${Buffer.from('Admin:Admin').toString('base64')}`

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return next(createError(401))

  if (expectedAuthorizationHeader !== req.headers.authorization) return next(createError(401))

  return next()
}
