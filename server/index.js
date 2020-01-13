const express = require('express')
const Bundler = require('parcel-bundler')
const operator = require('./operatorClient')
const auth = require('./auth')
const bundler = new Bundler('./index.html', {watch: true})

const app = express()

app.use(bundler.middleware())

app.use(express.static('dist'))
app.use(operator.routes)
app.use('/auth', auth)

app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`)

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
