import React, { useEffect, useState } from 'react'
import Qr from './components/qr'
import Data from './components/data'

export default function App ({firstName, lastName}) {
  const [token, setToken] = useState(null)
  return (
    <div>
      { token ? <Data token={token} area="baseData"></Data> 
        : <Qr onToken={(token) => setToken(token)}></Qr>
      }
    </div>
  ) 
}
