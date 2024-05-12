import { useAddress } from "@/hooks/useAddress";
import { Button, Tag, message } from "antd";

export const IPButton = ({ address }: { address: string }) => {
    const { getShortAddress } = useAddress();
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <Tag color="blue" style={{cursor: "pointer"}} onClick={
                () => {
                    window.navigator.clipboard.writeText(address);
                    messageApi.success("Copied address");
                }
            }>{getShortAddress(address)}</Tag>
        </>
    )
}