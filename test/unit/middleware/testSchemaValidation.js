const SchemaValidation = require('../../../middleware/schemaValidation')
const schema = require('../../../routes/submitFeedback').inputSchema

const schemaValidation = SchemaValidation(schema)

describe('schemaValidation', () => {
  const res = {
    send: sinon.spy()
  }
  const next = sinon.spy()

  context('when schema is valid', () => {
    it('should call next', () => {
      schemaValidation({
        body: {
          authorName: 'Some Name',
          body: 'Awesome hotel!!!'
        }
      }, res, next)

      expect(next).to.have.been.called()
    })
  })

  context('when schema is invalid', () => {
    it('should call res send with errors', () => {
      schemaValidation({
        body: {}
      }, res, next)

      expect(res.send).to.have.been.called()
    })
  })
})
