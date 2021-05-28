import { useEffect, useState } from 'react'
import { ListView, WingBlank } from 'antd-mobile'
import HistoryVouchers from '../components/history_vouchers'
import client from '../network/request'
import useSWR from 'swr'

const HistoryTab = () => {
  // const url = `http://127.0.0.1:3333/api/v1/admin/redeemed-vouchers`;
  // const { data: response, error } = useSWR(url);
  // const [historyList, setHistoryList] = useState([]);
  // const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
  const [histories, setHistories] = useState(
    new ListView.DataSource({
      // getRowData,
      rowHasChanged: (row1, row2) => row1 !== row2
    })
  )

  const [isLoading, setIsLoading] = useState(false)

  const refreshHistory = async ({ start, limit }) => {
    setIsLoading(true)

    const url = `http://127.0.0.1:3333/api/v1/admin/redeemed-vouchers`
    const result = await client.get(url)

    console.log(result)

    const vouchers = result.data.vouchers.data
    // const newList = historyList.concat(vouchers);
    const newDS = histories.cloneWithRows(vouchers)
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

  useEffect(() => {
    setHeight(document.documentElement.clientHeight - 32 - 45 - 50)
    // historyCount()

    console.log(histories)
  }, [histories])

  //   const user = useUser()

  //   const [totalCount, setTotalCount] = useState(0)
  const [height, setHeight] = useState(0)

  return (
    <>
      <WingBlank>
        <h1>History</h1>
      </WingBlank>

      <HistoryVouchers
        height={height}
        histories={histories}
        isLoading={isLoading}
        // totalCount={totalCount}
        refreshHistory={refreshHistory}
      />
    </>
  )
}

export default HistoryTab
