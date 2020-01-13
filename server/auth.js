const operator = require('./operatorClient')
const {Router} = require('express')
const router = new Router()

router.post('/', async (req, res) => {
  console.log('POST')
  const { id, url } = await operator.initializeAuthentication()
  res.send({ id, url })
})

router.get('/:id', async (req, res) => {
  console.log('GET')
  const accessToken = await operator.getAuthentication(req.params.id)
  if (accessToken) return res.send({ accessToken })
  return res.sendStatus(404)
})

module.exports = router
