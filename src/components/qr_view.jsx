import QrReader from 'react-qr-reader'
import { useState, useEffect } from 'react'
import { Toast, WingBlank, Button } from 'antd-mobile'

const QRView = ({ scanVoucher, setIsScanning, setShowModal }) => {
  const handleScan = async (data) => {
    if (data) {
      Toast.loading('Loading...', 0)

      console.log(data)

      try {
        const result = await scanVoucher(data)
      } catch (e) {
        console.log(e)
      }

      setShowModal(true)

      Toast.hide()
    }
  }

  const handleError = (err) => {
    setError(err)
  }

  const [isReady, setIsReady] = useState(false)

  const [error, setError] = useState(null)

  useEffect(() => {
    setIsReady(true)
  }, [])

  return (
    <>
      {isReady && QrReader && (
        <div style={{}}>
          <WingBlank>
            <h2>Scan for QR</h2>
          </WingBlank>
          <QrReader
            delay={500}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />

          <WingBlank size="lg">
            <h4>{error?.toString()}</h4>
            <Button
              type="primary"
              style={{ background: '#FD9F13', borderColor: '#FD9F13' }}
              onClick={async () => {
                setIsScanning(false)
                // await handleScan("5e417fb51c8d3902e0d850db")
              }}
            >
              Cancel
            </Button>
          </WingBlank>

          <div
            style={{
              height: '60px'
            }}
          ></div>
        </div>
      )}
    </>
  )
}

export default QRView
