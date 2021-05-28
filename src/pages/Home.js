import { useState } from "react";
import { Modal, WingBlank, Button, Flex } from "antd-mobile";
import QRView from "../components/qr_view";
import client from "../network/request";

const HomeTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const scanVoucher = async (data) => {
    console.log(data);
    const url = "http://127.0.0.1:3333/api/v1/admin/redeem-voucher";
    try {
      const voucher = await client.post(url, data);
      console.log(voucher);
      setTitle("Thank You");
      setMessage("Successfully Redeemed Voucher");
    } catch (e) {
      console.log(e);
      setTitle("Error");
      if (e.code == "voucher.expired") {
        setMessage(e.message);
      } else if (e.code == "voucher.redeemed") {
        setMessage(e.message);
      } else {
        setMessage(e.message);
      }
    }

    setIsScanning(false);
  };

  return (
    <>
      {isScanning ? (
        <>
          <QRView
            scanVoucher={scanVoucher}
            setIsScanning={setIsScanning}
            setShowModal={setShowModal}
          />
        </>
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

          <Modal
            visible={showModal}
            transparent
            // onCancel={setShowModal(false)}
            title={title}
            footer={[
              {
                text: "OK",
                onPress: () => {
                  setShowModal(false);
                  // setIsScanning(true);
                },
              },
            ]}
            animationType="slide-up"
          >
            <div style={{ height: 50 }}>{message}</div>
          </Modal>
        </>
      )}
    </>
  );
};

export default HomeTab;
