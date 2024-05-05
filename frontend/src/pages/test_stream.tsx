import { Input } from "antd";
import { useRef, useState, useCallback } from "react";

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

      let element = document.getElementById("console.log");
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

  const fetchReply = useCallback(async () => {
    let url = 'http://35.240.232.243:5000/execute/';

    let options = {
        method: 'POST',
        body: 'cd ~/detrain/model_parallelism/examples/tp/nn/; torchrun --nnodes=1 --nproc_per_node=2 --rdzv_id=101 --rdzv-backend=c10d --rdzv_endpoint="localhost:9999" main.py --epochs=1 --batch_size=50 --lr=0.001'
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
        <br/>
        <textarea style={{backgroundColor: "#333", color: "white"}} id="console.log" />
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