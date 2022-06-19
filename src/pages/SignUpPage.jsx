import React, { useEffect, useRef } from 'react'
import { Auth } from 'aws-amplify'
import { useForm } from '../hooks/useForm'
export const SignUpPage = () => {

  const [user, handleChange, setUser] = useForm({username: '', password: ''})
  const usernameRef = useRef()
  const passwordRef = useRef()

    const signUp = async (username, password) => {
      try {
        await Auth.signUp({
          username,
          password,
        })
        await Auth.signIn(username, password);
       
      } catch (error) {
        console.log('error signing up:', error)
      }
    }

  const onSignUp = (e) => {
    e.preventDefault()
        signUp(user.username, user.password)
  }
  
  const showUserInfo = async() => {
        const userInfo = await Auth.currentUserInfo();
        console.log('userInfo', userInfo);
  }

  return (
    <section>
      <form onSubmit={onSignUp}>
        <input ref={usernameRef} onChange={handleChange} value={user.username} name="username" type="text" />
        <input ref={passwordRef} onChange={handleChange} value={user.password} name="password" type="password" />
        <button>Signup</button>
      </form>
      <div>
        <button onClick={() => showUserInfo()}>ssss</button>
      </div>
    </section>
  )
}
