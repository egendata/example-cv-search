const { create } = require('@egendata/client')
const { readFileSync } = require('fs')

const clientKey = process.env.PRIVATE_KEY || readFileSync('./private.pem', 'utf8')

const config = {
  displayName: 'CV Search',
  description: 'Indexerar ditt CV',
  iconURI: `${process.env.CLIENT_ID}/android-icon-96x96.png`,
  clientId: process.env.CLIENT_ID || 'http://localhost:5000',
  operator: process.env.OPERATOR_URL || 'http://localhost:3000',
  jwksPath: '/jwks',
  eventsPath: '/events',
  clientKey,
  defaultPermissions: [
    {
      domain: 'https://cv-test.dev.services.jtech.se',
      area: 'baseData',
      types: ['READ'],
      purpose: 'For nicer greeting',
    }
  ],
  keyValueStore: keyValueStore
}
const client = create(config)

module.exports = client