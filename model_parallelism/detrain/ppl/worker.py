import torch.distributed.rpc as rpc
from detrain.ppl.master_node import run_master
def run_worker(rank, world_size, model, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size):
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
        run_master(model, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size)
    else:
        print(f"--- Init worker {rank} RPC")
        rpc.init_rpc(
            f"worker{rank}",
            rank=rank,
            world_size=world_size,
            rpc_backend_options=options
        )
        print(f"--- Done Init worker {rank} RPC")
        pass

    # block until all rpcs finish
    rpc.shutdown()
