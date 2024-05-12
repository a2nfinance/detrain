import { useAppDispatch, useAppSelector } from "@/controller/hooks";
import { setFormsProps } from "@/controller/setup/setupFormsSlice"
import { useRemoteServer } from "@/hooks/useRemoteServer";
import { headStyle } from "@/theme/layout"
import { cloneGitCommand, getPipelineParallelismCommand, getTensorParallelismCommand, pullGitCommand } from "@/utils/command-template";
import { Button, Card, Col, Descriptions, Divider, Row, Space, Tag } from "antd"
import { useCallback } from "react";
import { TrainingLogs } from "../logs/TrainingLogs";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { useDB } from "@/hooks/useDB";
import { IPButton } from "../common/IPButton";


export const Review = () => {
    const { sendCommand, downloadFile } = useRemoteServer();
    const { savePipeline } = useDB();
    const dispatch = useAppDispatch();
    const { startTrainingAction } = useAppSelector(state => state.process);
    const { parallelForm, nodesForm, trainingScriptForm, downloadButtonEnable } = useAppSelector(state => state.setupForms)
    const handleTrainingProcess = useCallback(() => {
        savePipeline()
        let command = ""
        if (trainingScriptForm.isClone) {
            command = cloneGitCommand(
                trainingScriptForm.repo,
                trainingScriptForm.toFolder,
                trainingScriptForm.isPrivate,
                trainingScriptForm.username,
                trainingScriptForm.password
            )
        } else {
            command = pullGitCommand(
                trainingScriptForm.repo,
                trainingScriptForm.toFolder,
                trainingScriptForm.isPrivate,
                trainingScriptForm.username,
                trainingScriptForm.password
            )
        }

        let deviceArray = nodesForm.nodes.map(node => {
            return node.gpu ? 1 : 0;
        })
        let deviceString = deviceArray.join("_");
        nodesForm.nodes.map((node, index) => {
            if (parallelForm.type === "pipeline") {
                if (nodesForm.masterNode?.address) {
                    let trainCommand = getPipelineParallelismCommand(
                        trainingScriptForm.filePath,
                        parallelForm.nnodes,
                        parallelForm.nprocPerNode,
                        nodesForm.masterNode?.address,
                        nodesForm.masterNode?.port,
                        parallelForm.epochs,
                        parallelForm.batchSize,
                        parallelForm.learningRate,
                        deviceString,
                        parallelForm.modelName,
                        index
                    )
                    let newCommand = command + trainCommand;
                    console.log(newCommand);
                    dispatch(updateActionStatus({ actionName: actionNames.startTrainingAction, value: true }))
                    sendCommand(node.ip, newCommand, `node.${index}.log`, index, node.agentPort);
                }

            } else {
                if (nodesForm.rendezvousBackend?.id) {
                    let trainCommand = getTensorParallelismCommand(
                        trainingScriptForm.filePath,
                        parallelForm.nnodes,
                        parallelForm.nprocPerNode,
                        nodesForm.rendezvousBackend?.id,
                        nodesForm.rendezvousBackend?.backend,
                        nodesForm.rendezvousBackend?.hostIP + ":" + nodesForm.rendezvousBackend?.port,
                        parallelForm.epochs,
                        parallelForm.batchSize,
                        parallelForm.learningRate,
                        deviceString,
                        parallelForm.modelName
                    )
                    let newCommand = command + trainCommand
                    console.log(newCommand)
                    dispatch(updateActionStatus({ actionName: actionNames.startTrainingAction, value: true }))
                    sendCommand(node.ip, newCommand, `node.${index}.log`, index, node.agentPort)
                }

            }


        });



    }, [])

    const downloadModel = useCallback(() => {
        let path = trainingScriptForm.filePath.slice(0, trainingScriptForm.filePath.lastIndexOf("/") + 1);
        let modelPath = path + `${parallelForm.modelName}.pt`;
        if (!trainingScriptForm.isClone) {
            modelPath = `${trainingScriptForm.toFolder}/${modelPath}`;
        }
        console.log(modelPath)
        let nodeIP = nodesForm.nodes[0].ip

        if (nodeIP) {
            downloadFile(nodeIP, modelPath, nodesForm.nodes[0].agentPort)
        }



    }, [])
    return (
        <Card title="Review & Start training process" headStyle={headStyle} extra={
            <Space>
                <Button type="primary" size='large' onClick={() => dispatch(setFormsProps({ att: "currentStep", value: 2 }))}>Back</Button>

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
                        {nodesForm.nodes.map((node, index) => {
                            return (
                                <p key={`node-${index}`}>
                                    <IPButton address={node.ip} />
                                </p>
                            )
                        })}
                    </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Device">
                    <Space direction="vertical">
                        {nodesForm.nodes.map((node, index) => {
                            return (
                                <p key={`device-${index}`}>
                                    {node.gpu ? "GPU" : "CPU"}
                                </p>
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

                            <p>ID: {nodesForm.rendezvousBackend?.id} </p>
                            <p>Backend: {nodesForm.rendezvousBackend?.backend}</p>
                            <p>Host: {nodesForm.rendezvousBackend?.hostIP}:{nodesForm.rendezvousBackend?.port}</p>

                        </Space>
                    </Descriptions.Item>
                }
            </Descriptions>
            <Descriptions title="Training Script" column={3} layout="vertical">

                <Descriptions.Item label="Is private repo">
                    {trainingScriptForm.isPrivate ? "yes" : "no"}
                </Descriptions.Item>

                <Descriptions.Item label="Clone or Pull request">
                    {trainingScriptForm.isClone ? "Clone" : "Pull"}
                </Descriptions.Item>
                <Descriptions.Item label="To folder">
                    {trainingScriptForm.toFolder}
                </Descriptions.Item>

            </Descriptions>
            <Descriptions column={1} layout="vertical">
                <Descriptions.Item label="Repo">
                    <Tag color="blue" onClick={() => window.open(trainingScriptForm.repo, "_blank")}>{trainingScriptForm.repo}</Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Training script path">
                    {trainingScriptForm.filePath}
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <TrainingLogs nodes={nodesForm.nodes} />
            <Divider />
            <Row gutter={12}>
                <Col span={12}>
                    <Button loading={startTrainingAction} onClick={() => handleTrainingProcess()} block type="primary" size="large">Start training process</Button>
                </Col>
                <Col span={12}>
                    <Button onClick={() => downloadModel()} block type="primary" size="large" disabled={!downloadButtonEnable}>Download Model</Button>
                </Col>


            </Row>


        </Card>
    )
}