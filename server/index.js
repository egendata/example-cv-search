const express = require('express')
const Bundler = require('parcel-bundler')
const operator = require('./operatorClient')
const bundler = new Bundler('./index.html', {watch: true})

const auth = require('./auth')
const data = require('./data')

const app = express()
app.use(express.static('dist'))
app.use(operator.routes)
app.use('/auth', auth)
app.use('/data', data)
app.use(bundler.middleware())

app.listen(process.env.PORT || 5000, async () => {
  console.log(`Listening on port ${process.env.PORT || 5000}`)

  try {
    operator.events.on('CONNECTING', (attempt) =>
      console.log(`Connecting to Operator, attempt ${attempt + 1}`))
    await operator.connect()
    console.log('Connected to operator')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})
