import { useAppDispatch, useAppSelector } from "@/controller/hooks";
import { setFormsProps } from "@/controller/setup/setupFormsSlice"
import { headStyle } from "@/theme/layout"
import { Button, Card, Descriptions, Space } from "antd"
import { useCallback } from "react";

export const Review = () => {
    const dispatch = useAppDispatch();
    const { parallelForm, nodesForm, trainingScriptForm } = useAppSelector(state => state.setupForms)
    const handleTrainingProcess = useCallback(() => {
        // Start node rank 0
        // Start node rank N
        // Update log rank 0
    }, [])
    return (
        <Card title="Review & Start training process" headStyle={headStyle} extra={
            <Space>
                <Button type="primary" size='large' onClick={() => dispatch(setFormsProps({ att: "currentStep", value: 1 }))}>Back</Button>

            </Space>
        }>
            <Descriptions title="Parallelism Settings" column={3} layout="vertical">
                <Descriptions.Item label="Type">
                    {parallelForm.type === "pipeline" ? "Pipeline parallelism" : "Tensor parallelism"}
                </Descriptions.Item>
                <Descriptions.Item label="Number of Nodes">
                    {parallelForm.nnodes}
                </Descriptions.Item>
                <Descriptions.Item label="Number of processes per Node">
                    {parallelForm.nprocPerNode}
                </Descriptions.Item>
                <Descriptions.Item label="Batch size">
                    {parallelForm.batchSize}
                </Descriptions.Item>
                <Descriptions.Item label="Epochs">
                    {parallelForm.epochs}
                </Descriptions.Item>
                <Descriptions.Item label="Learning rate">
                    {parallelForm.learningRate}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title="Nodes Settings" column={3} layout="vertical">
                <Descriptions.Item label="Nodes">
                    <Space direction="vertical">
                        {nodesForm.nodes.map(node => {
                            return (
                                <p>{node.ip} | {node.gpu ? "GPU" : "CPU"}</p>
                            )
                        })}
                    </Space>
                </Descriptions.Item>
                {
                    parallelForm.type === "pipeline" ? <Descriptions.Item label="Master node">
                        {
                            `${nodesForm.masterNode?.address}:${nodesForm.masterNode?.port}`
                        }
                    </Descriptions.Item> : <Descriptions.Item label="Rendezvous backend">
                        <Space direction="vertical">
                            
                                <p>ID: {nodesForm.rendezvousBackend?.id} | Backend: {nodesForm.rendezvousBackend?.backend}</p>
                                <p>Host: {nodesForm.rendezvousBackend?.hostIP}:{nodesForm.rendezvousBackend?.port}</p>
                            
                        </Space>
                    </Descriptions.Item>
                }
            </Descriptions>
            <Descriptions title="Training Script" column={3} layout="vertical">
                <Descriptions.Item label="Repo">
                    {trainingScriptForm.repo}
                </Descriptions.Item>
                <Descriptions.Item label="Destination">
                    {trainingScriptForm.toFolder}
                </Descriptions.Item>
                <Descriptions.Item label="Training file path">
                    {trainingScriptForm.filePath}
                </Descriptions.Item>
            </Descriptions>
            
            <Button onClick={() => handleTrainingProcess()} block type="primary" size="large">Start training process</Button>
        </Card>
    )
}