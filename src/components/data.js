import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'

export default ({token, area}) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    console.log('reading data in', area, token)
    fetch(`/data/${area}`, {headers: {'authorization': `Bearer ${token}`}})
      .then(response => console.log('response', response) || response.text())
      .then(data => {
        console.log('data', data)
        setData(data)
      })
  }, [token, area])

  return ( 
    <pre>
      {data ? JSON.stringify(data, null, 2) : 'No data' + token}
    </pre> 
  )
}