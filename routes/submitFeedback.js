const feedbackController = require('../controllers/feedbackController')

module.exports = {
  method: 'POST',
  path: '/submit',
  controller: feedbackController.addFeedback,
  inputSchema: {
    type: 'object',
    required: [
      'authorName',
      'body'
    ],
    properties: {
      authorName: {
        type: 'string',
        description: 'Authros first name white space surname'
      },
      body: {
        type: 'string',
        description: 'Hotel feedback'
      }
    }
  }
}
