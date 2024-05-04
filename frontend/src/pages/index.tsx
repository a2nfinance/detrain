import { Divider, Typography } from "antd";
import Head from "next/head";
const {Title} = Typography;
export default function Index() {
    return (
        <>  
            <Head>
                <title>Homepage</title>
            </Head>
            <Title level={3}>{"RECENT DAOs".toUpperCase()}</Title >
            <Divider />
            
        </>
    )
}