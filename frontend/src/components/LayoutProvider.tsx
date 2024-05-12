import {
    AppstoreOutlined,
    GithubOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { SlOrganization } from "react-icons/sl";
import { Button, Form, Image, Layout, Menu, Space, theme } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { FaSuperscript } from "react-icons/fa";
import { ConnectWallet } from './common/ConnectWallet';
const { Header, Sider, Content, Footer } = Layout;

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const LayoutProvider = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} onCollapse={() => setCollapsed(!collapsed)} collapsed={collapsed} style={{ background: colorBgContainer }}>
                <div style={{ height: 50, margin: 16 }}>
                    {
                        !collapsed ? <Image src={"/logo.png"} alt="DeTrain" preview={false} width={150} /> : <Image src={"/icon.png"} alt="DeTrain" preview={false} width={50} height={50} />
                    }
                </div>

                <Menu
                    style={{ fontWeight: 600 }}
                    inlineIndent={10}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '2',
                            icon: <AppstoreOutlined />,
                            label: "My pipelines",
                            onClick: () => router.push("/")
                        },
                        {
                            key: '3',
                            icon: <SlOrganization />,
                            label: "New pipeline",
                            onClick: () => router.push("/pipeline/setup")
                        },
                        { type: "divider" },
                        {
                            key: "4",
                            type: "group",
                            label: !collapsed ? 'Detrain Console v1.0.0' : "",
                            children: [
                                {
                                    key: '4.1',
                                    icon: <FaSuperscript />,
                                    label: 'Twitter',
                                    onClick: () => window.open("https://twitter.com/DeTrainA2N", "_blank")
                                },
                                {
                                    key: '4.2',
                                    icon: <GithubOutlined />,
                                    label: 'Github',
                                    onClick: () => window.open("https://github.com/a2nfinance/detrain", "_blank")
                                },
                            ]
                        },

                    ]}
                />
            </Sider>
            <Layout>

                <Header //@ts-ignore
                    style={{ padding: 0, backgroundColor: colorBgContainer }}>
                    <Space align="center" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Form layout="inline">
                            <Form.Item>

                                <ConnectWallet />
                            </Form.Item>
                        </Form>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0 16px',
                        padding: 16,
                        boxSizing: "border-box",
                        // background: colorBgContainer,
                        maxWidth: 1440,
                        marginRight: "auto",
                        marginLeft: "auto"
                    }}
                >
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center', maxHeight: 50 }}>DeTrain ©2024 Created by A2N Finance</Footer>
            </Layout>

        </Layout>
    )

}
