const { create } = require('@egendata/client')
const { createMemoryStore } = require('@egendata/client/lib/memoryStore')
const { readFileSync } = require('fs')

const clientKey = process.env.PRIVATE_KEY || readFileSync('./dev_key.pem', 'utf8')
const clientId = process.env.CLIENT_ID || 'http://localhost:5000'

const config = {
  displayName: 'CV Search',
  description: 'Indexerar ditt CV',
  iconURI: `${clientId}/android-icon-96x96.png`,
  clientId: clientId || 'http://localhost:5000',
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
  keyValueStore: createMemoryStore()
}
const client = create(config)

module.exports = client
