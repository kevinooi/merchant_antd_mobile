import React from 'react'
import { WingBlank } from 'antd-mobile'
import VerificationCodeForm from '../components/verification_code_form'
import { useLocation } from 'react-router-dom'

const VerificationCode = () => {
  const location = useLocation()
  return (
    <WingBlank>
      <h1
        style={{ whiteSpace: 'pre-line' }}
      >{`Please check ${location?.state?.detail?.toString()} for verification code`}</h1>
      <VerificationCodeForm email={location?.state?.detail?.toString()} />
    </WingBlank>
  )
}

export default VerificationCode
