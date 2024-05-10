import { useAppDispatch, useAppSelector } from "@/controller/hooks";
import { setFormsProps } from "@/controller/setup/setupFormsSlice";
import { headStyle } from "@/theme/layout";
import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import { MdOutlineMail, MdPassword } from "react-icons/md";
export const GitConfig = () => {
    const { trainingScriptForm } = useAppSelector(state => state.setupForms)
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        dispatch(setFormsProps({ att: "trainingScriptForm", value: values }))
        dispatch(setFormsProps({ att: "currentStep", value: 3 }))
    };
    return (
        <Form
            form={form}
            name='training_script_form'
            initialValues={trainingScriptForm}
            onFinish={onFinish}
            layout='vertical'>
            <Card title="Training script" headStyle={headStyle} extra={
                <Space>
                    <Button type="primary" size='large' onClick={() => dispatch(setFormsProps({ att: "currentStep", value: 1 }))}>Back</Button>
                    <Button type="primary" htmlType='submit' size='large'>Next</Button>
                </Space>
            }>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="repo" label="Git repository" rules={[{ required: true, message: 'Incorrect contact email' }]}>
                            <Input addonBefore={<MdOutlineMail />} size='large' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="isPrivate" label="Is private" rules={[{ required: true, message: 'Incorrect contact email' }]}>
                            <Select options={[
                                { label: "Yes", value: true },
                                { label: "No", value: false }
                            ]} size="large" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="toFolder" label="Destination" rules={[{ required: true, message: 'Incorrect contact email' }]}>
                            <Input addonBefore={<MdOutlineMail />} size='large' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="isClone" label="Clone or Pull request" rules={[{ required: true, message: 'Incorrect contact email' }]}>
                            <Select options={[
                                { label: "Clone", value: true },
                                { label: "Pull", value: false }
                            ]} size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="filePath" label="Training script path" rules={[{ required: true, message: 'Missing description' }]}>
                    <Input size='large' />
                </Form.Item>


                <Card title="Git credential">
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item name="username" label="Username" rules={[{ message: 'Incorrect contact email' }]}>
                                <Input addonBefore={<UserOutlined />} size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="password" label="Password" rules={[{ message: 'Incorrect contact email' }]}>
                                <Input type="password" addonBefore={<MdPassword />} size='large' />
                            </Form.Item>
                        </Col>

                    </Row>
                </Card>
            </Card>
            <Divider />
        </Form>
    )
}