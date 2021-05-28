import { List, WingBlank } from 'antd-mobile'
// import { mutate } from "swr";

// import customFetch from "../../lib/fetch";
// import { useState } from "react";

const Item = List.Item

// interface ProfileProps {
//   profile?: Object
// }

const ProfileTab = () => {
  //   const user = useUser()
  //   const [isChangePassword, setIsChangePassword] = useState(false)
  //   const router = useRouter()

  return (
    <>
      {/* {isChangePassword ? (
        <>
          <WingBlank>
            <h1>Please change your password</h1>
          </WingBlank>

          <EditPasswordForm cancel={() => setIsChangePassword(false)} />
        </>
      ) : (
        <>
          <WingBlank>
            <h1>
              {(user?.places?.length > 0 && user.places[0]?.name) ?? "Place"}
            </h1>
          </WingBlank>

          <List renderHeader="Email">
            <Item multipleLine={true} wrap={true}>
              {user?.email ?? "Email"}
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
                await customFetch("/api/logout")
                mutate("/api/user", { isLoggedIn: false })
              }}
              arrow="horizontal"
            >
              Logout
            </Item>
          </List>

          {user?.role?.name == "Admin" && (
            <List renderHeader="Admin">
              <Item
                onClick={() => {
                  router.push("/signup")
                }}
              >
                Register user
              </Item>
            </List>
          )}
        </>
      )} */}
    </>
  )
}

export default ProfileTab
