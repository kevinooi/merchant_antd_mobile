import { List, WingBlank } from 'antd-mobile'
import EditPasswordForm from '../components/edit_password_form'
import store, { logout } from '../store/auth'
import { useState } from 'react'
import { useSnapshot } from 'valtio'
import { useHistory } from 'react-router-dom'

const Item = List.Item

// interface ProfileProps {
//   profile?: Object
// }

const ProfileTab = () => {
  const { profile } = useSnapshot(store)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const history = useHistory()

  return (
    <>
      {isChangePassword ? (
        <>
          <WingBlank>
            <h1>Please change your password</h1>
          </WingBlank>

          <WingBlank>
            <EditPasswordForm cancel={() => setIsChangePassword(false)} />
          </WingBlank>
        </>
      ) : (
        <>
          <WingBlank>
            <h1>{profile?.vendor?.vendor_name ?? ''}</h1>
          </WingBlank>

          <List renderHeader="Email">
            <Item multipleLine={true} wrap={true}>
              {profile?.email ?? 'Email'}
            </Item>
          </List>

          <List renderHeader="Option">
            <Item
              onClick={() => {
                setIsChangePassword(true)
              }}
              arrow="horizontal"
            >
              Change password
            </Item>
            <Item
              onClick={async () => {
                logout()
              }}
              arrow="horizontal"
            >
              Logout
            </Item>
          </List>

          {profile?.role?.name == 'Admin' && (
            <List renderHeader="Admin">
              <Item
                onClick={() => {
                  history.push('/signup')
                }}
              >
                Register user
              </Item>
            </List>
          )}
        </>
      )}
    </>
  )
}

export default ProfileTab
