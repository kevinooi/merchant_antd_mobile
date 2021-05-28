import { ListView, List, PullToRefresh } from 'antd-mobile'
import moment from 'moment'

const HistoryVouchers = ({
  height,
  histories,
  isLoading,
  totalCount,
  refreshHistory,
  onClick = (value) => {}
}) => {
  console.log(histories)
  return (
    <ListView
      dataSource={histories}
      renderFooter={() => (
        <div style={{ padding: 30, textAlign: 'center' }}>
          {isLoading ? 'Loading...' : 'Pull to refresh'}
        </div>
      )}
      renderRow={(rowData, rowID) => {
        console.log(rowData)
        return (
          // <List renderHeader={() => 'Basic Style'} className="my-list">
          //   {' '}
          //   <List.Item extra={'extra content'}>Title</List.Item>{' '}
          // </List>
          <List
            key={rowID}
            renderHeader={
              <>
                <p style={{ margin: 0, color: 'green' }}>
                  {rowData.redeemed_at
                    ? moment(rowData.redeemed_at).format('YYYY-MM-DD HH:mma')
                    : ''}
                </p>
              </>
            }
            // renderFooter={
            //   <>
            //     <p
            //       style={{
            //         margin: 0,
            //         color: rowData.checkout_time ? "green" : "red",
            //       }}
            //     >
            //       {rowData.checkout_time ? "Check out" : "Check out pending"}
            //     </p>
            //     {rowData.checkout_time
            //       ? moment(rowData.checkout_time).format("YYYY-MM-DD HH:mma")
            //       : ""}
            //   </>
            // }
          >
            <List.Item multipleLine={true} wrap={true}>
              {rowData.status == 0
                ? 'Pending'
                : rowData.status == 1
                ? `Redeemed on ${
                    rowData.redeemed_at
                      ? moment(rowData.redeemed_at).format('YYYY-MM-DD HH:mma')
                      : ''
                  }`
                : `Expired on ${
                    rowData.expired_at ? moment(rowData.expired_at).format('YYYY-MM-DD HH:mma') : ''
                  }`}
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
          return
        }

        await refreshHistory({ start: histories.getRowCount(), limit: 5 })
      }}
      onEndReachedThreshold={10}
      style={{
        height,
        overflow: 'auto'
      }}
      pullToRefresh={
        <PullToRefresh
          refreshing={isLoading}
          onRefresh={() => refreshHistory({ start: 0, limit: 15 })}
          indicator={{
            activate: 'Release to refresh',
            deactivate: 'Release to cancel',
            release: 'Refreshing...',
            finish: 'Content refreshed'
          }}
        />
      }
    />
  )
}

const ListBody = (props) => {
  return <div className="am-list-body">{props.children}</div>
}

export default HistoryVouchers
