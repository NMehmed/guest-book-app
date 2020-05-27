const db = require('../db')
const isEmptyQuery = obj => Object.keys(obj).length === 0 && obj.constructor === Object

module.exports = {
  getFeedbacks: (req, res) => {
    query = req.query && !isEmptyQuery(req.query) ? req.query : null
    
    res.send(db.getFeedbacks(query))
  },

  addFeedback: (req, res) => {
    const feedback = req.body

    const feedbackFromDB = db.addFeedback(feedback)

    res.send(feedbackFromDB)
  }
}