
# To run samples:
# bash run_example.sh {file_to_run.py} {num_gpus}

echo "Launching ${1:-fsdp_tp_example.py} with ${2:-4} gpus"
torchrun --nnodes=3 --nproc_per_node=1 --node_rank=0 --master_addr=localhost --master_port=9999 main.py  --epochs=4 --batch_size=50 --lr=0.001 