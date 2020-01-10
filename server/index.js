const express = require('express')
const operator = require('./operatorClient')

const app = express()

app.use(express.static('dist'))

app.listen(process.env.PORT, () => {
  console.log('Listening on port 3000!')

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
