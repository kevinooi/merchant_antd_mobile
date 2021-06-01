import React from 'react'
import { WingBlank } from 'antd-mobile'
import ForgotPasswordForm from '../components/forgot_password_form'

const ForgotPassword = () => {
  return (
    <WingBlank>
      <h1 style={{ whiteSpace: 'pre-line' }}>{`Please enter your email`}</h1>
      <ForgotPasswordForm />
    </WingBlank>
  )
}

export default ForgotPassword
