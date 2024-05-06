from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from command import single_execute, manage_command
import subprocess

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
    return StreamingResponse(console_log, media_type='text/plain')

@app.post("/do/")
async def do_command(request: Request):
    command =  await request.body()
    result = manage_command(command)
    return result

@app.post("/download/")
async def download_file(request: Request):
    path = await request.body()
    path = path.decode("utf-8")
    splash_index = path.rindex("/")
    file_name = path[(splash_index + 1) : len(path)]
    result = FileResponse(path=path, filename=file_name, media_type='application/octet-stream')
    return result

if __name__ == "__main__":
    print("Starting DeTrain agent")
    subprocess.Popen("fuser -k 5000/tcp", stdout=subprocess.PIPE, shell=True)
    subprocess.Popen("killall gunicorn; gunicorn -w 1 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:5000 main:app --daemon", stdout=subprocess.PIPE, shell=True)
    print("Agent is started")