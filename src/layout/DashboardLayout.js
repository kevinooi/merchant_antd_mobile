import DefaultLayout from './DefaultLayout'
import TabLayout from './TabLayout'
// import { useState } from "react";

import HomeTab from '../pages/Home'
import ProfileTab from '../pages/Profile'
import HistoryTab from '../pages/History'
// import useUser from "../../lib/hooks/useUser";
// import { ActivityIndicator, WingBlank } from "antd-mobile";

const Dashboard = () => {
  // const user = useUser({ redirectTo: "/" })

  return (
    <>
      {/* {user?.isLoggedIn ? (
        user?.is_default_password ? (
          <DefaultLayout>
            <WingBlank>
              <h1>Please change your password</h1>
            </WingBlank>
            
            <EditPasswordForm cancel={null} />
          </DefaultLayout>
        ) :  */}
      <DefaultLayout>
        {<TabLayout tabs={[<HomeTab />, <HistoryTab />, <ProfileTab />]} />}
      </DefaultLayout>
      {/* ) : (
        <DefaultLayout>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator size="large" />
          </div>
        </DefaultLayout>
      )} */}
    </>
  )
}

export default Dashboard
