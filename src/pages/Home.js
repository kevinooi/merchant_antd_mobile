import { useState } from "react";
import { WingBlank, Button, Flex } from "antd-mobile";
import QRView from "../components/qr_view";

const HomeTab = () => {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <>
      {isScanning ? (
        <QRView setIsScanning={setIsScanning} />
      ) : (
        <>
          <WingBlank>
            <h1>Redeem Voucher</h1>
            <Flex>
              <Flex.Item>
                <Button
                  type="primary"
                  style={{ background: "#FD9F13", borderColor: "#FD9F13" }}
                  onClick={() => {
                    setIsScanning(!isScanning);
                  }}
                >
                  Scan QR
                </Button>
              </Flex.Item>
            </Flex>
          </WingBlank>
        </>
      )}
    </>
  );
};

export default HomeTab;
