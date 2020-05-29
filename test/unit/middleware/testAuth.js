const auth = require('../../../middleware/auth')

describe('auth', () => {
  const res = {}

  const next = sinon.spy()

  context('when authorization header is missing', () => {
    it('should call next with 401 error', () => {
      auth({ headers: {} }, res, next)

      expect(next).to.have.been.called.with('error')
    })
  })

  context('when authorization header but admin password is wrong', () => {
    it('should call next with 401 error', () => {
      auth({
        headers: {
          authorization: `Basic ${Buffer.from('Admin:WrongPassword').toString('base64')}`
        }
      }, res, next)

      expect(next).to.have.been.called.with('error')
    })
  })

  context('when it\'s called with correct password', () => {
    it('should call next', () => {
      auth({
        headers: {
          authorization: `Basic ${Buffer.from('Admin:Admin').toString('base64')}`
        }
      }, res, next)

      expect(next).to.have.been.calledWith()
    })
  })
})
