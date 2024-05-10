import { Collapse, CollapseProps } from "antd";

export const TrainingLogs = ({nodes}: {nodes: {ip: string, gpu: boolean}[]}) => {
    const activeKeys: string[] = [];
    const items: CollapseProps['items'] = nodes.map((node, index) => {
        activeKeys.push(`node-${index}`);
        return {
            key: `node-${index}`,
            label: `${node.ip} - ${index === 0 ? "Master Node/ Node Rank 0" : `Node ${index}`}`,
            children: <textarea placeholder="Remote server - training process logs" id={`node.${index}.log`} style={{borderRadius: 10, width: "100%", backgroundColor: "#333", color: "whitesmoke"}}/>,
        }
    })
    return (
        <Collapse items={items} defaultActiveKey={activeKeys}/>
    )
}