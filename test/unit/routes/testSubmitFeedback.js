const submitFeedbackRoute = require('../../../routes/submitFeedback')

describe('getFeedbacks Route', () => {
  it('should return paths methods controller and etc', () => {
    expect(submitFeedbackRoute.method).to.be.a('string')
    expect(submitFeedbackRoute.path).to.be.a('string')
    expect(submitFeedbackRoute.controller).to.be.a('function')
    expect(submitFeedbackRoute.inputSchema).to.be.a('object')
  })
})
