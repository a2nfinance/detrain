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
                        title: 'General',
                        description: "Select a parallelism type and setup training parameters."
                    },
                    {
                        title: 'Nodes Settings',
                        description: "Add nodes for the training process"
                    },
                    {
                        title: 'Training Script',
                        description: "Add github repository and setup training script file"
                    },
                    {
                        title: 'Review & Start training process',

                    },
                ]}
            />
        </Card>

    )
}