from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from command import single_execute, manage_command
import time
from itertools import chain
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=[ "X-Experimental-Stream-Data"],  # this is needed for streaming data header to be read by the client
)

@app.post("/execute/")
async def execcute_training(request: Request):
    command =  await request.body()
    console_log = single_execute(command)
    return StreamingResponse(console_log, media_type="text/event-stream")

@app.post("/do/")
async def do_command(request: Request):
    command =  await request.body()
    result = manage_command(command)
    return result


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, log_level="info")