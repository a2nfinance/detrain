import { useAppDispatch, useAppSelector } from "@/controller/hooks";
import { setFormsProps } from "@/controller/setup/setupFormsSlice";
import { useAkash } from "@/hooks/useAkash";
import { headStyle } from "@/theme/layout";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useChain } from "@cosmos-kit/react-lite";
import { Alert, Button, Card, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import { useEffect } from "react";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";

export const NodesConfig = () => {
    const { address } = useChain("akash");
    const { nodesForm, parallelForm, deployments } = useAppSelector(state => state.setupForms)
    const dispatch = useAppDispatch();
    const { getDeployment } = useAkash()
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        // Validate master node
        dispatch(setFormsProps({ att: "nodesForm", value: values }))
        dispatch(setFormsProps({ att: "currentStep", value: 2 }))
    };

    useEffect(() => {
        if (address) {
            getDeployment(address)
        }
    }, [address])
    return (
        <Form
            form={form}
            name='nodes_form'
            initialValues={nodesForm}
            onFinish={onFinish}
            layout='vertical'>
            <Card title="Nodes settings" headStyle={headStyle} extra={
                <Space>
                    <Button type="primary" size='large' onClick={() => dispatch(setFormsProps({ att: "currentStep", value: 0 }))}>Back</Button>
                    <Button type="primary" htmlType='submit' size='large'>Next</Button>
                </Space>
            }>

                {
                    parallelForm.type === "pipeline" && <><Alert showIcon type="info" message="A node should serve as the master node equipped with a CPU for tensor offloading." /><br /></>
                }
                <Form.List name="nodes">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <>
                                <Row key={key} style={{ display: 'flex', marginBottom: 8 }} gutter={12}>
                                    <Col span={16}>
                                        <Form.Item
                                            label={index === 0 ? "Master node (address or public IP)" : (index === 1 ? "Worker node" : "")}
                                            {...restField}
                                            name={[name, 'ip']}
                                            rules={[{ required: true, message: 'Missing ip' }]}
                                        >
                                            {parallelForm.akashOnly ? <Select notFoundContent={"No Akash deployment found"} size="large" options={
                                                deployments?.map(d => {
                                                    return {
                                                        label: d.name,
                                                        value: d.ip
                                                    }
                                                })
                                            } /> : <Input size='large' placeholder="Node public IP" />}
                                        </Form.Item>

                                    </Col>
                                    <Col span={4}>
                                        <Form.Item label={index === 0 ? "Agent Port" : (index === 1 ? "Agent port" : "")}
                                            {...restField}
                                            name={[name, 'agentPort']}
                                            rules={[{ required: true, message: 'Missing port' }]}>
                                            <Input type={"number"} size='large' />
                                        </Form.Item>

                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            label={index === 0 ? "Use GPU" : (index === 1 ? "Use GPU" : "")}
                                            {...restField}
                                            name={[name, 'gpu']}
                                            rules={[{ required: true, message: 'Use gpu or not' }]}
                                        >
                                            <Select size="large" options={[
                                                { label: "Yes", value: true },
                                                { label: "No", value: false },
                                            ]}>

                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    

                                </Row>
                                {index === 0 ? <Divider /> : ""}
                                </>
                            ))}

                            {/* <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add node
                                </Button>
                            </Form.Item> */}
                        </>
                    )}
                </Form.List>

                {parallelForm.type === "pipeline" ? <Card title="Master node - worker node communication">
                    <Alert message="This setting enables worker nodes to communicate with the master node. The address can be a domain, localhost, or IP. If you use an internal IP for the master node address, ensure that all nodes are in the same local group. The master node port must be an open port." showIcon type="info" />
                    <br />
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item name={["masterNode", "address"]} label="Address" rules={[{ required: true, message: 'Missing address' }]}>
                                <Input type="string" addonBefore={<MdOutlineMail />} size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={["masterNode", "port"]} label="Port" rules={[{ required: true, message: 'Missing port' }]}>
                                <Input type="number" addonBefore={<MdOutlineMail />} size='large' />
                            </Form.Item>
                        </Col>

                    </Row></Card> :
                    <Card title="Rendezvous Backend">
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item name={["rendezvousBackend", "id"]} label="ID" rules={[{ required: true, message: 'Missing ID' }]}>
                                    <Input type="number" addonBefore={<CgWebsite />} size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={["rendezvousBackend", "backend"]} label="Backend" rules={[{ required: true, message: 'Incorrect website URL' }]}>
                                    <Input addonBefore={<CgWebsite />} size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12}>

                            <Col span={12}>
                                <Form.Item name={["rendezvousBackend", "hostIP"]} label="Host" rules={[{ required: true, message: 'Missing ID' }]}>
                                    <Input addonBefore={<CgWebsite />} size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={["rendezvousBackend", "port"]} label="Port" rules={[{ required: true, message: 'Incorrect website URL' }]}>
                                    <Input type="number" addonBefore={<CgWebsite />} size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                }
            </Card>
            <Divider />
        </Form >
    )
}