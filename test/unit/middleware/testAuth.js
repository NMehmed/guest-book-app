const auth = require('../../../middleware/auth')

describe('auth', () => {
  const res = {
    send: sinon.spy()
  }

  const next = sinon.spy()

  context('when authorization header is missing', () => {
    it('should send 401', () => {
      auth({ headers: {} }, res)

      expect(res.send).to.have.been.calledWith(401)
    })
  })

  context('when authorization header but admin password is wrong', () => {
    it('should send 401', () => {
      auth({
        headers: {
          authorization: `Basic ${Buffer.from('Admin:WrongPassword').toString('base64')}`
        }
      }, res)

      expect(res.send).to.have.been.calledWith(401)
    })
  })

  context('when it\'s called with correct password', () => {
    it('should call next', () => {
      auth({
        headers: {
          authorization: `Basic ${Buffer.from('Admin:Admin').toString('base64')}`
        }
      }, res, next)

      expect(next).to.have.been.called()
    })
  })
})
