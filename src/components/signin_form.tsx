import { List, WhiteSpace, Button, Toast } from 'antd-mobile'
import { Formik, Form } from 'formik'
import { mutate } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { MyInputItem } from './formik_input'
// import Link from "next/link"

import AuthService from '../network/services/auth'
import { useState } from 'react'
import { login } from '../store/auth'

interface FormErrors {
  email?: string
  password?: string
}

interface FormValues {
  email: string
  password: string
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values: FormValues) => {
        const errors: FormErrors = {}

        if (!values.email) {
          errors.email = 'Email is required'
          Toast.info('Email is required', 1)
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
          Toast.info('Invalid email address')
        }

        return errors
      }}
      onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
        setSubmitting(true)

        const { email, password } = values

        try {
          const result = await AuthService.login({ email: email, password: password })

          console.log(result)

          if (result) {
            setStatus({ success: true })
            login({ token: result.data.jwt.token, profile: result.data.user })
            // history.push('/dashboard')
            mutate('/me', result)
          } else {
          }

          setSubmitting(false)
        } catch (error) {
          setErrors({ password: error })
          Toast.info(error.toString(), 2)
          setStatus({ success: false })
          // console.log(error)
        }

        setSubmitting(false)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        // handleSubmit,
        isSubmitting,
        submitForm
      }) => (
        <Form>
          <List
          // renderFooter={
          //   <Link href="/forgot_password">
          //     <a style={{ display: "block", textAlign: "right" }}>Forgot password?</a>
          //   </Link>
          // }
          >
            <MyInputItem
              type="email"
              name="email"
              label="Email"
              onChange={(value) => setFieldValue('email', value)}
              onBlur={() => setFieldTouched('email', true)}
              value={values.email}
              touched={touched.email}
              error={errors.email != null}
            />

            <MyInputItem
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              onChange={(value) => setFieldValue('password', value)}
              onBlur={handleBlur}
              value={values.password}
              touched={touched.password}
              error={errors.password != null}
              extra={
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() => setShowPassword(!showPassword)}
                />
              }
            />
          </List>

          <WhiteSpace />

          <Button
            type="primary"
            style={{ background: '#FD9F13', borderColor: '#FD9F13' }}
            loading={isSubmitting}
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignInForm
