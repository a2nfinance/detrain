import torch.nn as nn
import time
import os
from detrain.ppl.args_util import get_args
from detrain.ppl.worker import run_worker
from detrain.ppl.dataset_util import get_torchvision_dataset
from shards_model import NNShard1, NNShard2
from torch.distributed.optim.optimizer import DistributedOptimizer
import torch.optim as optim
# Define model here
# torchrun \
# --nproc_per_node=1 --nnodes=3 --node_rank=0 \
# --master_addr=localhost --master_port=9999 \
# main.py --use_syn
if __name__=="__main__":
    args = get_args()
    # Get args
    world_size = int(os.environ["WORLD_SIZE"])
    rank = int(os.environ["RANK"])
    epochs = int(args.epochs)
    batch_size = int(args.batch_size)
    lr = float(args.lr)
    device = "cpu"

    # Check devices
    if (args.gpu is not None):
        device = "cuda:0"
    
    # Define optimizer & loss_fn
    loss_fn = nn.CrossEntropyLoss()
    optimizer_class = optim.SGD
    
    # Dataloaders

    (train_dataloader, test_dataloader) = get_torchvision_dataset("MNIST", batch_size)

    
    print(f"World_size: {world_size}, Rank: {rank}")
    num_split = 4
    tik = time.time()
    run_worker(
        rank, 
        world_size, 
        (
            args.split_size, 
            ["worker1", "worker2"],
            [device, device], 
            [NNShard1, NNShard2]
        ), 
        train_dataloader, 
        test_dataloader, 
        loss_fn, 
        optimizer_class, 
        epochs, 
        batch_size,
        lr
    )
    tok = time.time()
    print(f"number of splits = {num_split}, execution time = {tok - tik}")