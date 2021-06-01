import { List, WhiteSpace, Button, Toast, Flex } from 'antd-mobile'
import { Formik, Form } from 'formik'

import { MyInputItem } from './formik_input'
import { useHistory } from 'react-router-dom'
import client from '../network/request'

interface FormErrors {
  code?: string
}

interface FormValues {
  code: string
}

const VerificationCodeForm = ({ email }) => {
  const history = useHistory()

  return (
    <Formik
      initialValues={{ code: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values: FormValues) => {
        const errors: FormErrors = {}

        if (!values.code) {
          errors.code = 'Verification code is required'
          Toast.info('Verification code is required', 1)
        } else if (values.code.length !== 6) {
          errors.code = 'Invalid verification code'
          Toast.info('Invalid verification code')
        }

        return errors
      }}
      onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
        setSubmitting(true)

        const { code } = values

        try {
          const result = await client.post(`/auth/code/verify`, {
            email: email,
            code: code
          })

          if (result.status !== 200) {
            setErrors({ code: result.data })
            Toast.info('Something went wrong, please contact Jomgift', 2)
          } else if (result.data.code === 'auth.code.invalid') {
            resetForm({})
            Toast.info(result.data.message, 2)
          } else {
            history.push({ pathname: '/reset-password', state: { detail: email, code: code } })
          }

          setSubmitting(false)
        } catch (error) {
          console.log(error)
          let message = 'Verification failed'
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
              type="money"
              name="code"
              moneyKeyboardAlign="left"
              onChange={(value) => setFieldValue('code', value)}
              onBlur={() => setFieldTouched('code', true)}
              value={values.code}
              touched={touched.code}
              error={errors.code != null}
            />
          </List>

          <WhiteSpace />

          <Flex>
            <Flex.Item>
              <Button
                type="ghost"
                style={{ color: '#FD9F13', borderColor: '#FD9F13' }}
                onClick={() => {
                  history.push('/forgot-password')
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

export default VerificationCodeForm
