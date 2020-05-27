const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/feedback', (req, res, next) => {
  const query = req.query

  res.send(db.getFeedbacks(query))
})

// authorName
// body
// dateCreated
router.post('/submit', (req, res, next) => {
  let feedback = req.body

  feedback = db.addFeedback(feedback)

  res.send(feedback)
})

module.exports = { path: '/', router }
