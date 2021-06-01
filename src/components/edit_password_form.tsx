import { List, WhiteSpace, Button, Toast, Flex, WingBlank } from 'antd-mobile'
import { Formik, Form } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import client from '../network/request'
import { MyInputItem } from './formik_input'
import AuthService from '../network/services/auth'
import { mutate } from 'swr'
import { login } from '../store/auth'

interface FormErrors {
  password?: string
  new_password?: string
  confirm_password?: string
}

interface FormValues {
  password?: string
  new_password: string
  confirm_password: string
}

interface FormProps {
  cancel?: () => void
  email?: string
  code?: string
}

const EditPasswordForm = ({ cancel, email, code }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const history = useHistory()

  return (
    <Formik
      initialValues={{ password: '', new_password: '', confirm_password: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values: FormValues) => {
        const errors: FormErrors = {}

        var count = 0

        count += /[a-z]/.test(values.new_password) ? 1 : 0
        // count += /[A-Z]/.test(values.new_password) ? 1 : 0
        count += /\d/.test(values.new_password) ? 1 : 0
        // count += /[@]/.test(values.new_password) ? 1 : 0

        if (code == null && email == null) {
          if (!values.password) {
            errors.password = 'Password is required'
            Toast.info('Password is required', 1)

            return errors
          }
        }

        if (!values.new_password) {
          errors.new_password = 'New password is required'
          Toast.info('New password is required', 1)

          return errors
        } else if (count < 2) {
          errors.new_password =
            'Password must contain at least one letter, at least one number, and be longer than 8 characters.'
          Toast.info(
            'Password must contain at least one letter, at least one number, and be longer than 8 characters.',
            1
          )

          return errors
        }

        if (values.confirm_password !== values.new_password) {
          errors.confirm_password = 'Password does not match'
          Toast.info('Password does not match', 1)
        }

        return errors
      }}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        setSubmitting(true)

        const { password, new_password, confirm_password } = values

        if (email == null && code == null) {
          try {
            const result = await client.post(`/auth/change-password`, {
              password: password,
              new_password: new_password,
              new_password_confirmation: confirm_password
            })

            if (result.status !== 200) {
              setErrors({ confirm_password: result.data })
              Toast.info('Something went wrong, please contact Jomgift', 2)
            } else {
              Toast.info('Password updated', 2)
              resetForm({})

              history.push('/')
            }

            setSubmitting(false)
          } catch (error) {
            let message = 'Password change failed'
            if (error.response?.data?.message[0]?.messages[0]?.message) {
              message = error.response?.data?.message[0]?.messages[0]?.message
            }

            Toast.info(message, 2)
          }
        } else {
          try {
            const result = await client.post(`/auth/forgot-password`, {
              email: email,
              password: new_password,
              password_confirmation: confirm_password,
              auth_code: code
            })

            if (result.status !== 200) {
              setErrors({ confirm_password: result.data })
              Toast.info('Something went wrong, please contact Jomgift', 2)
            } else {
              Toast.info('Password updated', 2)
              resetForm({})

              //Login after reset password
              const result = await AuthService.login({ email: email, password: new_password })

              if (result) {
                login({ token: result.data.jwt.token, profile: result.data.user })
                mutate('/me', result)
              } else {
              }
            }

            setSubmitting(false)
          } catch (error) {
            let message = 'Password change failed'
            if (error.response?.data?.message[0]?.messages[0]?.message) {
              message = error.response?.data?.message[0]?.messages[0]?.message
            }

            Toast.info(message, 2)
          }
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
          {code == null && email == null ? (
            <List renderHeader={'Current Password'}>
              <MyInputItem
                type={showPassword ? 'text' : 'password'}
                name="password"
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
          ) : (
            <></>
          )}

          <List renderHeader={'New Password'}>
            <MyInputItem
              type={showNewPassword ? 'text' : 'password'}
              name="new_password"
              onChange={(value) => setFieldValue('new_password', value)}
              onBlur={handleBlur}
              value={values.new_password}
              touched={touched.new_password}
              error={errors.new_password != null}
              extra={
                <FontAwesomeIcon
                  icon={showNewPassword ? faEye : faEyeSlash}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />
          </List>

          <List
            renderHeader={'Confirm Password'}
            renderFooter={
              'Password must contain at least one letter, at least one number, and be longer than 8 charaters.'
            }
          >
            <MyInputItem
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirm_password"
              onChange={(value) => setFieldValue('confirm_password', value)}
              onBlur={handleBlur}
              value={values.confirm_password}
              touched={touched.confirm_password}
              error={errors.confirm_password != null}
              extra={
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEye : faEyeSlash}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
          </List>

          <WhiteSpace />

          <WingBlank>
            {cancel ? (
              <Flex>
                <Flex.Item>
                  <Button
                    type="ghost"
                    style={{ color: '#FD9F13', borderColor: '#FD9F13' }}
                    onClick={cancel}
                  >
                    Cancel
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button
                    type="primary"
                    style={{ background: '#FD9F13', borderColor: '#FD9F13' }}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </Flex.Item>
              </Flex>
            ) : (
              <Button
                type="primary"
                style={{ background: '#FD9F13', borderColor: '#FD9F13' }}
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            )}
          </WingBlank>
        </Form>
      )}
    </Formik>
  )
}

export default EditPasswordForm
