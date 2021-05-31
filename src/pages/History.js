import { useEffect, useState } from 'react'
import { ListView, WingBlank } from 'antd-mobile'
import HistoryVouchers from '../components/history_vouchers'
import client from '../network/request'

const HistoryTab = () => {
  // const [historyList, setHistoryList] = useState([]);
  const [histories, setHistories] = useState(
    new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
  )
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [height, setHeight] = useState(0)

  const refreshHistory = async ({ start, limit }) => {
    setIsLoading(true)

    const url = `/admin/vouchers`
    const result = await client.get(url)

    console.log(result)
    const total = result.data.vouchers.meta.total
    const vouchers = result.data.vouchers.data
    // const newList = historyList.concat(vouchers);
    const newDS = histories.cloneWithRows(vouchers)
    setTotalCount(total)
    console.log(newDS)

    // setHistoryList(newList);
    setHistories(newDS)

    setIsLoading(false)
  }

  useEffect(() => {
    setHeight(document.documentElement.clientHeight - 32 - 45 - 50)
    // historyCount()

    refreshHistory({ start: 0, limit: 15 })
  }, [])

  //   const user = useUser()

  return (
    <>
      <WingBlank>
        <h1>History</h1>
      </WingBlank>

      <HistoryVouchers
        height={height}
        histories={histories}
        isLoading={isLoading}
        totalCount={totalCount}
        refreshHistory={refreshHistory}
      />
    </>
  )
}

export default HistoryTab
