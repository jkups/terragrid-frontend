import React, { useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

const Login = props => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = ev => {
    ev.preventDefault()

    axios.post(`${BASE_URL}/login`, {email, password})
    .then( res => {
      console.log(res.data);
      if(res.data.success){
        sessionStorage.setItem('token', JSON.Stringify(res.data.token))
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        props.setCurrentUser(res.data.user)
        props.history.push('/maps')
      }
    })
    .catch(console.error)
  }

  return(
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
