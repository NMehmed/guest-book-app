const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const njk = require('nunjucks')

var routes = Object.values(require('require-all')({
  dirname: __dirname + '/routes'
}))

const app = express()

const isDev = app.get('env') === 'development'

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

routes.forEach(({ path, router }) => {
  app.use(path, router)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
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
