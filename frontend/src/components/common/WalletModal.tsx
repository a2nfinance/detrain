import { WalletModalProps, WalletStatus } from "@cosmos-kit/core";
import { Avatar, Col, Flex, Modal, Row, Space } from "antd";

export const WalletModel = ({
    isOpen,
    setOpen,
    walletRepo,
}: WalletModalProps) => {
    const onCloseModal = () => {
        setOpen(false);
    };

    return (

        <Modal open={isOpen} style={{ maxWidth: 320 }} onCancel={onCloseModal} title={<center>Select your wallet</center>} footer={false}>


            <Row gutter={12}>
                {walletRepo?.wallets.map(
                    ({
                        walletName,
                        connect,
                        disconnect,
                        walletInfo,
                        walletStatus,
                        message,
                    }, index) => {
                        let action = () => { }
                        let url = `https://chromewebstore.google.com/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg`
                        if (walletInfo.prettyName == "Keplr") {
                            url = "https://chromewebstore.google.com/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en"
                        }
                        if (walletInfo.prettyName == "Cosmostation") {
                            url = "https://chromewebstore.google.com/detail/cosmostation-wallet/fpkhgmpbidmiogeglndfbkegfdlnajnf?hl=en"
                        }
                        switch (walletStatus) {
                            case WalletStatus.Disconnected:
                                action = () => { connect(), setOpen(false) }
                                break;
                            case WalletStatus.NotExist:
                                action = () => window.open(url, "_blank")

                                break;
                            // case WalletStatus.Connected:
                            //     button = (
                            //         <Button onClick={() => disconnect()}>Disconnect</Button>
                            //     );
                            //     break;
                            // case WalletStatus.Error:
                            //     button = (
                            //         <Alert message={message} showIcon type="error" />
                            //     );
                            //     break;
                        }
                        return (
                            <Col
                                key={walletName}
                                span={index > 1 ? 24 : 12}
                            >
                                {index <= 1 && <Flex
                                    onClick={action}
                                    justify="center"
                                    align="center"
                                    content="center"
                                    style={{cursor: "pointer", backgroundColor: "whitesmoke", paddingTop: 20, paddingBottom: 15, paddingLeft: 20, paddingRight: 20, marginTop: 20, borderRadius: 10 }}>
                                    <Space direction="vertical" style={{ alignItems: "center" }}>
                                        <Avatar size={64} src={<img src={walletInfo.logo?.toString()} />} />
                                        <strong>{walletInfo.prettyName}</strong>
                                    </Space>

                                </Flex>}
                                {index > 1 && <Flex
                                    onClick={action}
                                    justify="space-between"
                                    align="center"
                                    style={{ cursor: "pointer", backgroundColor: "whitesmoke", padding: 10, marginTop: 10, borderRadius: 10 }}>
                                    <Flex align="center"><Avatar size={32} style={{ marginRight: 8 }} src={<img src={walletInfo.logo?.toString()} />} /><strong>{walletInfo.prettyName}</strong></Flex>
                                </Flex>}

                            </Col>
                        )

                    }
                )}
            </Row>

        </Modal>

    );
};
