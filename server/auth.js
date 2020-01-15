const operator = require('./operatorClient')
const {Router} = require('express')
const router = new Router()

router.post('/', async (req, res) => {
  const { id, url } = await operator.initializeAuthentication()
  res.send({ id, url })
})

router.get('/:id', async (req, res) => {
  const accessToken = await operator.getAuthentication(req.params.id)
  
  if (accessToken) return res.send({ accessToken })
  return res.sendStatus(404)
})

module.exports = router
