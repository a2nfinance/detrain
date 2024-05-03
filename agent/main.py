from fastapi import FastAPI, Request
from command import execute
import uvicorn

app = FastAPI()


@app.post("/command/")
async def do_command(request: Request):
    command =  await request.body()
    return execute(command)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000, log_level="info")