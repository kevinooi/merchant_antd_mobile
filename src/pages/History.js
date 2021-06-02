import { useEffect, useState } from 'react'
import { ListView, WingBlank } from 'antd-mobile'
import HistoryVouchers from '../components/history_vouchers'
import client from '../network/request'
import store from '../store/auth'
import { useSnapshot } from 'valtio'

const HistoryTab = () => {
  const { profile } = useSnapshot(store)
  const [histories, setHistories] = useState(
    new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
  )
  const [historyList, setHistoryList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [height, setHeight] = useState(0)

  const refreshHistory = async ({ refresh, page, limit }) => {
    setIsLoading(true)

    const url = `/admin/vouchers?page=${page}&limit=${limit}`
    const result = await client.get(url)

    const total = result.data.vouchers.meta.total
    const currentPage = result.data.vouchers.meta.current_page

    setTotalCount(total)
    setCurrentPage(currentPage)

    const vouchers = result?.data?.vouchers?.data ?? []
    let newList = []

    if (refresh) {
      setHistoryList([])
      newList = vouchers
    } else {
      newList = historyList.concat(vouchers)
    }
    const newDS = histories.cloneWithRows(newList)

    setHistoryList(newList)
    setHistories(newDS)

    setIsLoading(false)
  }

  useEffect(() => {
    setHeight(document.documentElement.clientHeight - 32 - 45 - 50)
    refreshHistory({ refresh: true, page: 1, limit: 10 })
  }, [profile])

  return (
    <>
      <WingBlank>
        <h1>History</h1>
      </WingBlank>

      <HistoryVouchers
        height={height}
        currentPage={currentPage}
        histories={histories}
        isLoading={isLoading}
        totalCount={totalCount}
        refreshHistory={refreshHistory}
      />
    </>
  )
}

export default HistoryTab
