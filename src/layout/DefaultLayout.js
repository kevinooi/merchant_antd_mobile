import { NavBar } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
// import { useState } from "react";

const DefaultLayout = ({ children, title = 'JOMGIFT' }) => {
  return (
    <div>
      {/* <title>{title}</title> */}
      <NavBar
        mode="dark"
        icon={<></>}
        style={{ background: '#FD9F13', borderColor: '#FD9F13' }}
        // router.asPath == "/" ? <></> : <Icon type="left" />
        // onLeftClick={() => router.back()}
      >
        {title}
      </NavBar>
      <div
        style={{
          position: 'fixed',
          height: 'calc(100% - 45px)',
          width: '100%',
          bottom: 0
        }}
      >
        <>{children}</>
      </div>
    </div>
  )
}

export default DefaultLayout
