# Introduction

# Commands
```
torchrun --nnodes=2 --nproc_per_node=1 --rdzv_id=101 --rdzv-backend=c10d --rdzv_endpoint="10.148.0.7:9999" main.py --epochs=4 --batch_size=5 --lr=0.001
```