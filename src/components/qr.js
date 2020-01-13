import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import useLocalStorage from 'react-use-localstorage'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default ({onToken}) => {
  const [data, setData] = useState(null)
  const [token, setToken] = useLocalStorage('token', null);
 
  const poll = async (id, ms) => {
    const response = await fetch(`/auth/${id}`)
    if (response.status === 404) return sleep(ms).then(() => poll(id, ms))
    const {accessToken} = await response.json()
    return accessToken
  }

  useEffect(() => {
    if (token) return onToken(token)
    console.log('authenticating...')
    fetch('/auth', {method: 'POST'})
      .then(response => response.json())
      .then(data => {
        setData(data)
        return poll(data.id, 2000)
      })
      .then((accessToken) => {
        setToken(accessToken)
        onToken(accessToken)
      })
  }, [token])

  return ( 
    <div>
      <h1>Logga in via Egendata:</h1>
      {data ? <QRCode
        size={256}
        value={data.url}
        onClick={() => window.location.assign(data.url)}
      /> : <p>Loading QR...</p>}
    </div> 
  )
}