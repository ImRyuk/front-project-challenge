import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

const Auth = () => {
  const [searchParams] = useSearchParams()

  const login = async (): Promise<void> => {
    try {
      const response = await fetch('http://51.15.208.76:5050/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': ` ${searchParams.get('jwt')}`
        }
      })
      const responseData = await response.json()
      const { refreshToken } = responseData
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('token', searchParams.get('jwt') as string)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    login()
  }, [])

  return (
    <div>
      <p>{searchParams.get('jwt')}</p>
    </div>
  )
}

export default Auth
