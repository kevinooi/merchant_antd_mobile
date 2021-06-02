import { ListView, List, PullToRefresh } from 'antd-mobile'
import moment from 'moment'

const HistoryVouchers = ({
  height,
  currentPage,
  histories,
  isLoading,
  totalCount,
  refreshHistory,
  onClick = (value) => {}
}) => {
  return (
    <ListView
      dataSource={histories}
      renderFooter={() => (
        <div style={{ padding: 30, textAlign: 'center' }}>
          {isLoading ? 'Loading...' : 'Pull to refresh'}
        </div>
      )}
      renderRow={(rowData, rowID) => {
        const active = rowData.status === 0
        const redeemed = rowData.status === 1
        return (
          <List
            key={rowID}
            renderHeader={
              <h5
                style={{
                  margin: 0,
                  color: active ? '#33A7FF' : redeemed ? 'green' : '#D5563A',
                  fontSize: 18
                }}
              >
                Voucher Status:
                {active
                  ? ' Active'
                  : redeemed
                  ? ` Redeemed on ${
                      rowData.redeemed_at
                        ? moment(rowData.redeemed_at).format('YYYY-MM-DD HH:mma')
                        : ''
                    }`
                  : ` Expired`}
              </h5>
            }
          >
            <List.Item multipleLine={true} wrap={true}>
              <h5 style={{ margin: 0 }}>
                Sold on{' '}
                {rowData.created_at ? moment(rowData.created_at).format('YYYY-MM-DD HH:mma') : ''}
              </h5>
              {rowData.expired_at ? (
                <h5 style={{ margin: 0 }}>
                  Expired on {moment(rowData.expired_at).format('YYYY-MM-DD HH:mma')}
                </h5>
              ) : (
                ''
              )}
            </List.Item>
          </List>
        )
      }}
      renderBodyComponent={() => <ListBody />}
      renderSeparator={(sectionID, rowID) => (
        <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED'
          }}
        />
      )}
      className="am-list"
      onScroll={() => {}}
      scrollRenderAheadDistance={500}
      onEndReached={async (event) => {
        if (isLoading || histories.getRowCount() >= totalCount) {
          console.log(isLoading || histories.getRowCount() >= totalCount)
          return
        }

        await refreshHistory({ page: currentPage + 1, limit: 10 })
      }}
      onEndReachedThreshold={10}
      style={{
        height,
        overflow: 'auto'
      }}
      pullToRefresh={
        <PullToRefresh
          refreshing={isLoading}
          onRefresh={() => refreshHistory({ refresh: true, page: 1, limit: 10 })}
          indicator={{
            activate: 'Release to refresh',
            deactivate: 'Release to cancel',
            release: 'Refreshing...',
            finish: 'Content refreshed'
          }}
        />
      }
      pageSize={4}
    />
  )
}

const ListBody = (props) => {
  return <div className="am-list-body">{props.children}</div>
}

export default HistoryVouchers
