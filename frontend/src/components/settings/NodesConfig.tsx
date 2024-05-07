import { useAppDispatch, useAppSelector } from "@/controller/hooks";
import { setFormsProps } from "@/controller/setup/setupFormsSlice";
import { headStyle } from "@/theme/layout";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
export const NodesConfig = () => {
    const { nodesForm, parallelForm } = useAppSelector(state => state.setupForms)
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        dispatch(setFormsProps({ att: "nodesForm", value: values }))
        dispatch(setFormsProps({ att: "currentStep", value: 2 }))
    };
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


                <Form.List name="nodes">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <Row key={key} style={{ display: 'flex', marginBottom: 8 }} gutter={12}>
                                    <Col span={14}>
                                        <Form.Item
                                            label={index === 0 ? "Node public IP" : ""}
                                            {...restField}
                                            name={[name, 'ip']}
                                            rules={[{ required: true, message: 'Missing ip' }]}
                                        >
                                            <Input size='large' placeholder="Node public IP" />
                                        </Form.Item>

                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            label={index === 0 ? "Use GPU" : ""}
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
                                    <Col span={4}>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Col>

                                </Row>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add node
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                {parallelForm.type === "pipeline" ? <Card title="Master Node">
                    <Alert message="The master node must be one of the distributed nodes. The master node address can be a domain, localhost, or IP. If you use an internal IP for the master node address, ensure all nodes are in a local group. The master node port must be an opened port." showIcon type="info" />
                    <br/>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item name={["masterNode", "address"]} label="Address" rules={[{ required: true, message: 'Incorrect contact email' }]}>
                                <Input type="string" addonBefore={<MdOutlineMail />} size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={["masterNode", "port"]} label="Port" rules={[{ required: true, message: 'Incorrect contact email' }]}>
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
        </Form>
    )
}