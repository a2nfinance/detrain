import { useRemoteServer } from "@/hooks/useRemoteServer";
import { getTensorParallelismCommand } from "@/utils/command-template";
import { useCallback } from "react";

function App() {
  const { sendCommand, downloadFile } = useRemoteServer();

  const fetchReply = useCallback(async () => {
    let command = getTensorParallelismCommand(
      "~/detrain/model_parallelism/examples/tp/nn/main.py",
      1,
      2,
      101,
      "c10d",
      "localhost:9999",
      1,
      50,
      0.001,
      false,
      "tp"
    )
    sendCommand(
      "35.240.232.243",
      command,
      'console.log'
    )
  }, []);

  const testDownload = useCallback(() => {
    downloadFile(
      "35.240.232.243",
      '/home/info/detrain/model_parallelism/examples/tp/nn/tp.pt'
    )
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => fetchReply()}>
          {/* count is {messages} */}
          Fetch
        </button>
        <button onClick={() => testDownload()}>
          {/* count is {messages} */}
          Download
        </button>
        <br />
        <textarea style={{ backgroundColor: "#333", color: "white" }} id="console.log" />
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