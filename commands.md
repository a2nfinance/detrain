## Requires
- Port Open: 9999 & 5000 & 8000
- Python
- Pytorch CUDA support
- Git: `apt-get install git`
- FastAPI: `pip install fastapi`
- Uvicorn: `pip install fastapi;pip install "uvicorn[standard]" gunicorn`
- Install detrain: `pip install detrain`
- Pull agents: `git clone https://github.com/a2nfinance/detrain /mnt/data/detrain`
- Run agent: `python3 /mnt/data/detrain/agent/main.py`

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
curl -d "ls" -H "Content-Type: plain/text" -X POST http://localhost:5000/do/
curl -d "ls" -H "Content-Type: plain/text" -X POST http://localhost:5000/do/
curl -X GET http://localhost:5000/status
curl -d 'cd /mnt/d/WP/Blockchain/Projects/detrain/model_parallelism/examples/tp/nn/; torchrun --nnodes=1 --nproc_per_node=2 --rdzv_id=101 --rdzv-backend=c10d --rdzv_endpoint="localhost:9999" main.py --epochs=4 --batch_size=50 --lr=0.001' -H "Content-Type: plain/text" -X POST http://localhost:5000/execute/

curl -d 'cd ~/detrain/model_parallelism/examples/tp/nn/; torchrun --nnodes=1 --nproc_per_node=2 --rdzv_id=101 --rdzv-backend=c10d --rdzv_endpoint="localhost:9999" main.py --epochs=4 --batch_size=50 --lr=0.001' -H "Content-Type: plain/text" -X POST http://35.240.232.243:5000/execute/


curl -d 'cd ~/detrain/model_parallelism/examples/tp/nn/;ls' -H "Content-Type: plain/text" -X POST http://35.240.232.243:5000/execute/
```

```
10.233.71.3
10.233.102.159
10.233.102.155
```