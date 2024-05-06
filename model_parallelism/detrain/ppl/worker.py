import torch.distributed.rpc as rpc
from detrain.ppl.master_node import run_master
from detrain.ppl.dis_model import DistributedModel
from torch.distributed.optim.optimizer import DistributedOptimizer

def run_worker(rank, world_size, model_params, train_dataloader, test_dataloader, loss_fn, optimized_class, epochs, batch_size, lr):
    # Higher timeout is added to accommodate for kernel compilation time in case of ROCm.
    options = rpc.TensorPipeRpcBackendOptions(num_worker_threads=256, rpc_timeout=300)
    
    if rank == 0:
        print("--- Init master RPC")
        rpc.init_rpc(
            "master",
            rank=rank,
            world_size=world_size,
            rpc_backend_options=options
        )
        print("--- Done init master")
        model = DistributedModel(
            # split size
            model_params[0],
            # workers
            model_params[1],
            # Devices
            model_params[2],
            # Shards
            model_params[3]
        )
        optimizer = DistributedOptimizer(
            optimized_class,
            model.parameter_rrefs(),
            lr=lr,
        )
        run_master(model, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size)
    else:
        print(f"--- Init worker {rank} RPC")
        rpc.init_rpc(
            f"worker{rank}",
            rank=rank,
            world_size=world_size,
            rpc_backend_options=options
        )
        print(f"--- Start to listen & receive the forwarded data from the master node")
        pass

    # block until all rpcs finish
    rpc.shutdown()
