const { Router } = require('express')
const router = Router()
const operator = require('./operatorClient')
const { operator: domain } = operator.config

router.use(function(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1]
  if (!token) return next(Error('Invalid authorization header'))
  req.accessToken = token
  next();
});

router.get('/:area?', async ({ accessToken, params: { area } }, res, next) => {
  console.log('reading data from', domain, area, accessToken)
  try {
    const data = await operator.data.auth(accessToken).read({ domain, area })
    res.send(data)
} catch (err) {
    console.error('get data error', area, err)
  }
})

router.post('/:area', async ({ accessToken, body, params: { area } }, res, next) => {
  const data = body
  await operator.data.auth(accessToken).write({ domain, area, data })
  res.sendStatus(201)
})

module.exports = router