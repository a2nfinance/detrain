import { useAppSelector } from "@/controller/hooks";
import { Col, Row, Space } from "antd";
import Head from "next/head";
import { ParallelTypes } from "./settings/ParallelTypes";
import { NodesConfig } from "./settings/NodesConfig";
import { GitConfig } from "./settings/GitConfig";
import { Review } from "./settings/Review";
import { SetupSteps } from "./settings/SetupSteps";

export const FormComponents = () => {
    const { currentStep } = useAppSelector(state => state.setupForms);
    return (<div style={{ maxWidth: 1440, minWidth: 900, margin: "auto" }}>
         <Head>
            <title>New Training Settings</title>
        </Head>
        <Row gutter={10}>
            <Col span={14}>

                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    {currentStep === 0 && <ParallelTypes />}
                    {currentStep === 1 && <NodesConfig />}
                    {currentStep === 2 && <GitConfig />}
                    {currentStep === 3 && <Review />}
                </Space>
            </Col>
            <Col span={10}><SetupSteps /></Col>
        </Row>

    </div>)
}