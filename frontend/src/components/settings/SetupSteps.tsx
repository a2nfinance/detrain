import { headStyle } from '@/theme/layout';
import { Card, Steps } from 'antd';
import { useAppSelector } from '../../controller/hooks';

export const SetupSteps = () => {
    const { currentStep } = useAppSelector(state => state.setupForms)
    return (
        <Card title={"Steps"} headStyle={headStyle}>
            <Steps
                direction='vertical'
                current={currentStep}
                items={[
                    {
                        title: 'Select Parallel Type',
                        description: "Include Pipeline parallelism, Tensor Parallelism"
                    },
                    {
                        title: 'Nodes Settings',
                        description: "Add nodes for the training process"
                    },
                    {
                        title: 'Training Script',
                        description: "A proposal needs reviews and voting at all steps."
                    },
                    {
                        title: 'Review & Start training process',

                    },
                ]}
            />
        </Card>

    )
}