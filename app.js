const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const njk = require('nunjucks')
const auth = require('./middleware/auth')
const schemaValidation = require('./middleware/schemaValidation')

var routes = Object.values(require('require-all')({
  dirname: path.join(__dirname, 'routes')
}))

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

routes.forEach(({ method, path, controller, isAuhtRequired = false, inputSchema = null }) => {
  const router = express.Router()
  const middlewaresForRoute = []

  if (isAuhtRequired) middlewaresForRoute.push(auth)

  if (inputSchema) {
    const schemaValidationForRoute = schemaValidation(inputSchema)

    middlewaresForRoute.push(schemaValidationForRoute)
  }

  middlewaresForRoute.push(controller)

  router[method.toLowerCase()](path, ...middlewaresForRoute)

  app.use(router)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error.html')
})

// view engine setup
njk.configure('views', {
  autoescape: true,
  express: app
})

module.exports = app
