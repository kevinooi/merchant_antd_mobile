import DefaultLayout from './DefaultLayout'
import TabLayout from './TabLayout'

import HomeTab from '../pages/Home'
import ProfileTab from '../pages/Profile'
import HistoryTab from '../pages/History'

const Dashboard = () => {
  return (
    <>
      <DefaultLayout>
        {<TabLayout tabs={[<HomeTab />, <HistoryTab />, <ProfileTab />]} />}
      </DefaultLayout>
    </>
  )
}

export default Dashboard
