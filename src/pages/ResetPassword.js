import React from 'react'
import { WingBlank } from 'antd-mobile'
import EditPasswordForm from '../components/edit_password_form'
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
  const location = useLocation()
  return (
    <WingBlank>
      <h1 style={{ whiteSpace: 'pre-line' }}>{`Reset your password`}</h1>
      <EditPasswordForm
        email={location?.state?.detail?.toString() ?? null}
        code={location?.state?.code?.toString() ?? null}
      />
    </WingBlank>
  )
}

export default ResetPassword
