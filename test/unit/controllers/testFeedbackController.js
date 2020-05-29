const feedbackController = require('../../../controllers/feedbackController')
const db = require('../../../db')

const sandbox = sinon.createSandbox()

describe('feedbackController', () => {
  const resSpy = {
    send: sinon.spy()
  }

  afterEach(() => sandbox.restore())

  describe('getFeedbacks', () => {
    let dbGetFeedbacksStub
    let req

    beforeEach(() => {
      dbGetFeedbacksStub = sandbox.stub(db, 'getFeedbacks')
    })

    context('when request query is empty', () => {
      it('should call db with null instead of empty object', () => {
        req = { query: {} }
        feedbackController.getFeedbacks(req, resSpy)

        expect(db.getFeedbacks).to.have.been.called.with('null')
        expect(resSpy.send).to.have.been.called()
      })
    })

    context('when request query is not empty object', () => {
      it('should call db with query passed from request', () => {
        req = { query: { authroName: 'Tom Thompson' } }
        feedbackController.getFeedbacks(req, resSpy)

        expect(db.getFeedbacks).to.have.been.calledWith(req.query)
        expect(resSpy.send).to.have.been.called()
      })
    })

    context('when db throws error', () => {
      beforeEach(() => dbGetFeedbacksStub.throws(new Error('fail')))

      it('express will catch that error so we are not handling it on controller level', () => {
        try {
          req = { query: { authroName: 'Tom Thompson' } }

          feedbackController.getFeedbacks(req, resSpy)
        } catch (error) {
          expect(error).to.be.an('error')
        }
      })
    })
  })

  describe('addFeedback', () => {
    let req
    let addFeedbackStub

    beforeEach(() => {
      addFeedbackStub = sandbox.stub(db, 'addFeedback')
    })

    context('when everything is fine', () => {
      req = { body: {} }
      const dbResponse = {}

      beforeEach(() => {
        addFeedbackStub.returns(dbResponse)
      })

      it('should call response with the db response', () => {
        feedbackController.addFeedback(req, resSpy)

        expect(resSpy.send).to.have.been.calledWith(dbResponse)
      })
    })
  })
})
