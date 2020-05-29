const getFeedbacksRoute = require('../../../routes/getFeedbacks')

describe('getFeedbacks Route', () => {
  it('should return paths methods controller and etc', () => {
    expect(getFeedbacksRoute.method).to.be.a('string')
    expect(getFeedbacksRoute.path).to.be.a('string')
    expect(getFeedbacksRoute.controller).to.be.a('function')
    expect(getFeedbacksRoute.isAuhtRequired).to.be.a('boolean')
  })
})
