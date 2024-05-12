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
                        title: 'General settings',
                        description: "Select a parallelism type and set up training hyperparameters."
                    },
                    {
                        title: 'Nodes Settings',
                        description: "Add nodes and define communication parameters for the training process."
                    },
                    {
                        title: 'Training Script',
                        description: "Add GitHub repository and set up the training script file."
                    },
                    {
                        title: 'Review and start the training process',

                    },
                ]}
            />
        </Card>

    )
}