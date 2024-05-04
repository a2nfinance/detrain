import { GitConfig } from "@/components/settings/GitConfig";
import { NodesConfig } from "@/components/settings/NodesConfig";
import { ParallelTypes } from "@/components/settings/ParallelTypes";
import { Review } from "@/components/settings/Review";
import { SetupSteps } from "@/components/settings/SetupSteps";
import { useAppSelector } from "@/controller/hooks";
import { Col, Row, Space } from "antd";
import Head from "next/head";

export default function Setup() {
    const { currentStep } = useAppSelector(state => state.setupForms);
    return (
        <div style={{ maxWidth: 1440, minWidth: 900, margin: "auto" }}>
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

        </div>
    )
}