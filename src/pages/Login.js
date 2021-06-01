import React from 'react'
import { WingBlank } from 'antd-mobile'
import SignInForm from '../components/signin_form'

const Login = () => {
  return (
    <WingBlank>
      <h1 style={{ whiteSpace: 'pre-line' }}>{`Sign in to your account`}</h1>
      <SignInForm />
    </WingBlank>
  )
}

export default Login
