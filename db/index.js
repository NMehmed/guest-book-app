const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs')
const _ = require('lodash')
const moment = require('moment')

const DB_FILE_NAME = 'lowDB.json'
const FEEDBACKS_COLLECTION = 'feedbacks'

if (!fs.existsSync(DB_FILE_NAME)) {
  fs.writeFileSync(DB_FILE_NAME, '', 'utf8')
}

const adapter = new FileSync(DB_FILE_NAME)

const db = low(adapter)

db.defaults({ feedbacks: [] }).write()

const jsonDB = module.exports = {
  getFeedbacks: query => {
    if (query) {
      const { fromDate, toDate, authorName } = query

      return db.get(FEEDBACKS_COLLECTION)
      .filter(x => {
        if (authorName) return x.authorName === authorName

        return true
      })
      .filter(x=> {
        if (fromDate) return moment(x.dateCreated).isAfter(fromDate)

        return true
      })
      .filter(x=> {
        if (toDate) return moment(x.dateCreated).isBefore(toDate)

        return true
      })
      .value()
    } else {
      return db.get(FEEDBACKS_COLLECTION).value()
    }
  },

  addFeedback: newFeedback => {
    const feedbacks = jsonDB.getFeedbacks()

    newFeedback.dateCreated = moment().utc().format()

    feedbacks.push(newFeedback)

    db.set(FEEDBACKS_COLLECTION, feedbacks).write()

    return newFeedback
  }
}
