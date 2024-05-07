import { SetupFormState } from '@/controller/setup/setupFormsSlice';
import { headStyle } from '@/theme/layout';
import { Button, Card, Descriptions, Space } from 'antd';
import { useRouter } from 'next/router';

export const Item = ({ index, pipelineData }: {index: number, pipelineData: {_id: string, state: SetupFormState}}) => {
  const router = useRouter();
  return (
    <Card key={`dao-${index}`} title={pipelineData.state.parallelForm.modelName}  headStyle={headStyle} style={{ margin: 5, backgroundColor: "#f5f5f5" }} extra={
      <Space>
            <Button type='primary' onClick={() => router.push(`/pipeline/details/${pipelineData._id}`)}>Detail</Button>
      </Space>
     
    }>
      <Descriptions column={2} layout="horizontal">
                <Descriptions.Item label="Type">
                    {pipelineData.state.parallelForm.type === "pipeline" ? "Pipeline parallelism" : "Tensor parallelism"}
                </Descriptions.Item>
                <Descriptions.Item label="Number of Nodes">
                    {pipelineData.state.parallelForm.nnodes}
                </Descriptions.Item>
                <Descriptions.Item label="Number of processes per Node">
                    {pipelineData.state.parallelForm.nprocPerNode}
                </Descriptions.Item>
                <Descriptions.Item label="Batch size">
                    {pipelineData.state.parallelForm.batchSize}
                </Descriptions.Item>
                <Descriptions.Item label="Epochs">
                    {pipelineData.state.parallelForm.epochs}
                </Descriptions.Item>
                <Descriptions.Item label="Learning rate">
                    {pipelineData.state.parallelForm.learningRate}
                </Descriptions.Item>
            </Descriptions>
    </Card>
  );
}