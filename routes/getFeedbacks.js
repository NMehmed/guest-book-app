const feedbackController = require('../controllers/feedbackController')

module.exports = {
  method: 'GET', 
  path: '/feedback', 
  controller: feedbackController.getFeedbacks,
  isAuhtRequired: true 
}
