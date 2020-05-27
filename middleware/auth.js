const expectedAuthorizationHeader = `Basic ${Buffer.from('Admin:Admin').toString('base64')}`

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.send(401)

  if (expectedAuthorizationHeader !== req.headers.authorization) return res.send(401)

  return next()
}