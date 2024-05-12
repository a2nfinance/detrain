import { List } from "antd";
import { useEffect } from "react";
import { useAppSelector } from "@/controller/hooks";
import { Item } from "./Item";
import { useDB } from "@/hooks/useDB";
import { useChain } from "@cosmos-kit/react-lite";

export const MyPipelineList = () => {
    const {getPipelineByOwner} = useDB();
    const {address} = useChain("akash");
    const {pipelines} = useAppSelector(state => state.pipeline)
    useEffect(() => {
        if(address) {
            getPipelineByOwner();
        }
        
    }, [address])
    return (
        <List
            grid={{
                gutter: 12,
                column: 2
            }}
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 6,
                align: "center",
            }}
            dataSource={pipelines}
            renderItem={(item, index) => (
                <Item index={index} pipelineData={item} />
            )}
        />

    )
}

