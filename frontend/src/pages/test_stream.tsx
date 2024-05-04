import { useRef, useState, useCallback } from "react";
import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'

function App() {

  function onChunkedResponseComplete(result) {
    console.log('all done!', result)
  }

  function onChunkedResponseError(err) {
    console.error(err)
  }

  function processChunkedResponse(response) {
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
      if (result.done) {
        console.log('returning')
        return text;
      } else {
        console.log('recursing')
        return readChunk();
      }
    }
  }

  const fetchReply = useCallback(async () => {
    let url = 'http://35.240.232.243:5000/execute/';

    let options = {
        method: 'POST',
        body: `cd ~/detrain/model_parallelism/examples/tp/nn/;ls`
    }

    fetch(url, options)
        .then(processChunkedResponse)
        .then(onChunkedResponseComplete)
        .catch(onChunkedResponseError);
    
  }, []);


  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => fetchReply()}>
          {/* count is {messages} */}
          Fetch
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;