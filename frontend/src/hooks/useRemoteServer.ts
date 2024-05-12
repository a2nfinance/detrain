import { useAppDispatch, useAppSelector } from "@/controller/hooks";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { setFormsProps } from "@/controller/setup/setupFormsSlice";
export async function* streamingFetch(input: RequestInfo | URL, init?: RequestInit) {

    const response = await fetch(input, init)
    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');
    if (reader) {
        for (; ;) {
            const { done, value } = await reader.read()
            if (done) break;

            try {
                yield decoder.decode(value)
            }
            catch (e: any) {
                console.warn(e.message)
            }

        }
    }

}
export const useRemoteServer = () => {
    const dispatch = useAppDispatch();
    const { parallelForm, trainingScriptForm } = useAppSelector(state => state.setupForms)

    const sendCommand = async (protocol: string, remoteHostIP: string, command: string, outputElementId: string, rank: number, agentPort: number) => {
        try {
            let url = `${protocol}://${remoteHostIP}:${agentPort}/execute/`;
            if (agentPort === 80) {
                url = `${protocol}://${remoteHostIP}/execute/`;
            }
            let options = {
                method: 'POST',
                body: command,
                keepalive: true,
            }
            const it = streamingFetch(url, options)
            let element = document.getElementById(outputElementId);
            for await (let value of it) {
                try {
                    element?.append(value)
                } catch (e: any) {
                    console.warn(e.message)
                }
            }
            if (rank === 0) {
                dispatch(updateActionStatus({ actionName: actionNames.startTrainingAction, value: false }))
                dispatch(setFormsProps({ att: "downloadButtonEnable", value: true }))
            }
        } catch (e) {
            console.log(e);
        }


    }

    const downloadFile = async (protocol: string, remoteHostIP: string, filePath: string, masterNodeAgentPort: number) => {
        try {
            let url = `${protocol}://${remoteHostIP}:${masterNodeAgentPort}/download/`;
            if (masterNodeAgentPort === 80) {
                url = `${protocol}://${remoteHostIP}:5000/download/`;
            }
            let options = {
                method: 'POST',
                body: filePath
            }
    
            let response = await fetch(url, options)
            let blob = await response.blob();
            let href = window.URL.createObjectURL(blob);
            const a = Object.assign(document.createElement("a"), {
                href,
                style: "display:none",
                download: `${parallelForm.modelName}.pt`,
            });
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(href);
            a.remove();
    
        } catch(e) {
            console.log(e)
        }
        
    }

    return { sendCommand, downloadFile };
}