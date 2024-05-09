import { useAppDispatch } from "@/controller/hooks";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { setFormsProps } from "@/controller/setup/setupFormsSlice";

export const useRemoteServer = () => {
    const dispatch = useAppDispatch();
    function onChunkedResponseComplete(result, rank) {
        console.log('all done!', result)
        if (rank === 0) {
            dispatch(updateActionStatus({actionName: actionNames.startTrainingAction, value: false}))
            dispatch(setFormsProps({att: "downloadButtonEnable", value: true}))
        }
       
    }

    function onChunkedResponseError(err) {
        dispatch(updateActionStatus({actionName: actionNames.startTrainingAction, value: false}))
        dispatch(setFormsProps({att: "downloadButtonEnable", value: false}))
        console.error(err)
    }

    function processChunkedResponse(response, outputElementId: string) {
        var text = '';
        var reader = response.body.getReader()
        var decoder = new TextDecoder();

        return readChunk();

        function readChunk() {
            return reader.read().then(appendChunks);
        }

        function appendChunks(result) {
            var chunk = decoder.decode(result.value || new Uint8Array, { stream: !result.done });
            console.log('got chunk of', chunk.length, 'bytes')
            text += chunk;
            console.log('text so far is', text.length, 'bytes\n');

            let element = document.getElementById(outputElementId);
            element?.append(chunk)
           
            if (result.done) {
                
                console.log('returning')
                return text;
                
            } else {
                console.log('recursing')
                return readChunk();
            }
        }
    }

    const sendCommand = (remoteHostIP: string, command: string, outputElementId: string, rank: number) => { 
        let url = `//${remoteHostIP}:5000/execute/`;

        let options = {
            method: 'POST',
            body: command,
            keepalive: true,
        }

        fetch(url, options)
            .then((response) => processChunkedResponse(response, outputElementId))
            .then((result) => onChunkedResponseComplete(result, rank))
            .catch(onChunkedResponseError);
    }

    const downloadFile = (remoteHostIP: string, filePath: string) => {
        let url = `http://${remoteHostIP}:5000/download/`;

        let options = {
            method: 'POST',
            body: filePath
        }

        fetch(url, options)
            .then((response) => response.blob())
            .then(blob => {
                let href = window.URL.createObjectURL(blob);
                // window.location.assign(file);
                const a = Object.assign(document.createElement("a"), {
                    href,
                    style: "display:none",
                    download: "tp.pt",
                });
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(href);
                a.remove();
            })
            .catch(onChunkedResponseError);
    }

    return { sendCommand, downloadFile };

}