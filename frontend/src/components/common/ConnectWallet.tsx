
import { DisconnectOutlined, WalletFilled } from "@ant-design/icons";
import { useChain } from "@cosmos-kit/react-lite";
import { Button, Space } from "antd";
import { AddressButton } from "./AddressButton";
export const ConnectWallet = () => {
    const { openView, username, address, connect, disconnect, assets } = useChain("akash");

    return (
        !username ? <Button icon={<WalletFilled/>} type="primary" size="large" onClick={openView}>Connect Wallet</Button> : <Space>
            <AddressButton username={username} address={address ? `${address}` : ""}  />
            <Button icon={<DisconnectOutlined/>} title={"Disconnect"} size="large" onClick={() => disconnect()} />
            </Space>
    )
}