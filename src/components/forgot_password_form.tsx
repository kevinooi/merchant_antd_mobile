import { List, WhiteSpace, Button, Toast, Flex, Result } from 'antd-mobile'
import { Formik, Form } from 'formik'

import { MyInputItem } from './formik_input'
import { useHistory } from 'react-router-dom'
import client from '../network/request'

interface FormErrors {
  email?: string
}

interface FormValues {
  email: string
}

const ForgotPasswordForm = () => {
  const history = useHistory()

  return (
    <Formik
      initialValues={{ email: '' }}
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
      onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
        setSubmitting(true)

        const { email } = values

        try {
          const result = await client.post(`/auth/code`, {
            email: email
          })

          console.log(result)

          if (result.status != 200) {
            setErrors({ email: result.data })
            Toast.info('Something went wrong, please contact Jomgift', 2)
          } else {
            Toast.info(`A verification code has been sent to ${email}`, 2)
            resetForm({})
          }

          setSubmitting(false)
        } catch (error) {
          console.log(error)
          let message = 'Password reset failed'
          if (error.response?.data?.message[0]?.messages[0]?.message) {
            message = error.response?.data?.message[0]?.messages[0]?.message
          }

          Toast.info(message, 2)
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
          <List>
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
          </List>

          <WhiteSpace />

          <Flex>
            <Flex.Item>
              <Button
                type="ghost"
                style={{ color: '#FD9F13', borderColor: '#FD9F13' }}
                onClick={() => {
                  history.push('/')
                }}
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
        </Form>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm
