import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default () => {
  const [data, setData] = useState(null)
  const poll = async (id, ms) => {
    const response = await fetch(`/auth/${id}`)
    if (response.status === 404) return sleep(ms).then(() => poll(id, ms))
    const {accessToken} = await response.json()
    return accessToken
  }

  useEffect(() => {
    console.log('authenticating...')
    fetch('/auth', {method: 'POST'})
      .then(response => response.json())
      .then(data => {
        setData(data)
        return poll(data.id, 2000)
      })
      .then((accessToken) => {
        alert('login successfull: ' + accessToken)
      })
  }, [])

  return ( 
    <div>
      {data ? <QRCode
        size={256}
        value={data.url}
        id="qrcode"
        data-consent-request-id={data.id}
        data-consent-request-url={data.url}
        onClick={() => copy(data.url)}
      /> : <p>Loading QR...</p>}
    </div> 
  )
}