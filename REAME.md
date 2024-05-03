## Requires
- Port Open: 9999 & 5000 & 8000
- Python
- Pytorch CUDA support
- Git: `apt-get install git`
- FastAPI: `pip install fastapi`
- Uvicorn: `pip install "uvicorn[standard]"`
- Pull agents: `git clone https://github.com/a2nfinance/detrain /mnt/data/detrain`
- Link service: `ln -s /mnt/data/detrain/agent/detrain_agent.service  /usr/lib/systemd/system/detrain_agent.service`
- Deamon reload: `systemctl daemon-reload`
- Start service: `systemctl start detrain_agent.service`
- Start Agent with Uvicorn: `uvicorn main:app --reload --port 5000`

## Cleanup commands


## Check rest api

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data 'aaa' \
  http://localhost:5000/command/
```

```
curl -i -X POST -H "Content-Type: application/text" -d "{\"command\":\"sdsadasd\"}" http://localhost:5000/command/
```

```
curl -d "ls" -H "Content-Type: plain/text" -X POST http://localhost:5000/command/
curl -d "mkdir test;ls" -H "Content-Type: plain/text" -X POST http://localhost:5000/command/
```