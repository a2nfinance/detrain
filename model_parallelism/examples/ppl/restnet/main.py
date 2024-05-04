import torch.nn as nn
import time
from detrain.ppl.args_util import get_args
from detrain.ppl.worker import run_worker
from detrain.ppl.dis_model import DistributedModel
from detrain.ppl.dataset_util import get_torchvision_dataset
from shards_model import ResNetShard1, ResNetShard2
from torch.distributed.optim.optimizer import DistributedOptimizer
import torch.optim as optim
# Define model here

if __name__=="__main__":
    args = get_args()

    # Get args
    world_size = int(args.world_size)
    rank = int(args.rank)
    epochs = int(args.epochs)
    batch_size = int(args.batch_size)
    device = "cpu"

    # Check devices
    if (args.gpu is not None):
        device = "cuda:0"

    model = DistributedModel(
        args.split_size, 
        ["worker1", "worker2"],
        [device, device], 
        [ResNetShard1, ResNetShard2]
    )
    
    # Define optimizer & loss_fn
    loss_fn = nn.MSELoss()
    optimizer = DistributedOptimizer(
        optim.SGD,
        model.parameter_rrefs(),
        lr=args.lr,
    )
    # Dataloaders

    (train_dataloader, test_dataloader) = get_torchvision_dataset("M", batch_size)

    
    print(f"World_size: {world_size}, Rank: {rank}")
    num_split = 4
    tik = time.time()
    run_worker(rank, world_size, model, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size)
    tok = time.time()
    print(f"number of splits = {num_split}, execution time = {tok - tik}")