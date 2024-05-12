import { useAppDispatch, useAppSelector } from "@/controller/hooks";
import { setFormsProps } from "@/controller/setup/setupFormsSlice";
import { headStyle } from "@/theme/layout";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";
import { CgWebsite } from "react-icons/cg";
import { CiServer } from "react-icons/ci";
import { LuFileStack } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { VscServerProcess } from "react-icons/vsc";
import { MdMoreTime } from "react-icons/md";
export const ParallelTypes = () => {
    const { parallelForm } = useAppSelector(state => state.setupForms)
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        dispatch(setFormsProps({ att: "parallelForm", value: values }))
        dispatch(setFormsProps({ att: "currentStep", value: 1 }))
    };
    return (
        <Form
            form={form}
            name='parallel_form'
            initialValues={parallelForm}
            onFinish={onFinish}
            layout='vertical'>
            <Card title="General settings" headStyle={headStyle} extra={
                <Button type="primary" htmlType='submit' size='large'>Next</Button>
            }>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="type" label="Parallelism type" rules={[{ required: true, message: 'Missing parallel type' }]}>
                            <Select
                                options={[
                                    { label: "Pipline", value: "pipeline" },
                                    { label: "Tensor", value: "tensor" }
                                ]}
                                size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="modelName" label="Model Name" rules={[{ required: true, message: 'Missing model name' }]}>
                            <Input size='large' />
                        </Form.Item>
                    </Col>
                </Row>


                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="nnodes" label="Number of Nodes" rules={[{ required: true, message: 'Incorrect contact email' }]}>
                            <Input type="number" addonBefore={<CiServer />} size='large' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="nprocPerNode" label="Number of processes per node" rules={[{ required: true, message: 'Incorrect contact email' }]}>
                            <Input type="number" addonBefore={<VscServerProcess />} size='large' />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="batchSize" label="Batch Size" rules={[{ required: true, message: 'Incorrect website URL' }]}>
                            <Input type="number" addonBefore={<LuFileStack />} size='large' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="epochs" label="Epochs" rules={[{ required: true, message: 'Incorrect website URL' }]}>
                            <Input type="number" addonBefore={<MdMoreTime />} size='large' />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="learningRate" label="Learning Rate" rules={[{ required: true, message: 'Missing description' }]}>
                    <Input type="number" size='large' />
                </Form.Item>



            </Card>
            <Divider />
        </Form>
    )
}