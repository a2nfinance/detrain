import { useAddress } from "@/hooks/useAddress";
import { Button, message } from "antd";

export const AddressButton = ({ username, address }: { username: string, address: string }) => {
    const { getShortAddress } = useAddress();
    const [messageApi, contextHolder] = message.useMessage();
  
    return (
        <>
            {contextHolder}
            <Button type="primary" size="large" onClick={
                () => {
                    window.navigator.clipboard.writeText(address);
                    messageApi.success("Copied address");
                }
            }>{username}</Button>
        </>
    )
}