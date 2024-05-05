export const useRemoteServer = () => {
    function onChunkedResponseComplete(result) {
        console.log('all done!', result)
    }

    function onChunkedResponseError(err) {
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

    const sendCommand = (remoteHostIP: string, command: string, outputElementId: string) => {
        let url = `http://${remoteHostIP}:5000/execute/`;

        let options = {
            method: 'POST',
            body: command
        }

        fetch(url, options)
            .then((response) => processChunkedResponse(response, outputElementId))
            .then(onChunkedResponseComplete)
            .catch(onChunkedResponseError);
    }

    return {sendCommand};

}