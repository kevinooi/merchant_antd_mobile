import { WingBlank } from 'antd-mobile'
import store, { checkAuthorization } from './store/auth'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import './style.css'
import SignInForm from './components/signin_form'
import Dashboard from './layout/DashboardLayout'
import DefaultLayout from './layout/DefaultLayout'

const PrivateRoute = ({ children, ...rest }) => {
  const { token, profile } = useSnapshot(store)
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (token != null) {
          if (location.pathname.startsWith('/admin') && profile?.admin?.type !== 1) {
          } else {
            return children
          }
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}

const PublicRoute = ({ children, ...rest }) => {
  const { token } = useSnapshot(store)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return token == null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}

function App() {
  return (
    <Switch>
      <PrivateRoute path="/dashboard/:path?">
        <Switch>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
        </Switch>
      </PrivateRoute>

      <PublicRoute path="/">
        <DefaultLayout>
          <WingBlank>
            <h1 style={{ whiteSpace: 'pre-line' }}>{`Sign in to your account`}</h1>
            <SignInForm />
          </WingBlank>
        </DefaultLayout>
      </PublicRoute>
    </Switch>
  )
}

new Promise(() => {
  checkAuthorization()
})
  .then(() => App())
  .catch((error) => console.error(error))

export default App
