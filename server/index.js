const express = require('express')
const operator = require('./operatorClient')

const app = express()

app.use(express.static('dist'))
app.use(operator.routes)

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
