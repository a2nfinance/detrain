import torch
import torch.nn as nn
import torch.distributed.rpc as rpc
from torch.distributed.rpc import RRef

class DistributedModel(nn.Module):
    """
    Assemble multi parts as an nn.Module and define pipelining logic
    """
    def __init__(self, split_size, workers, devices, model_shards, *args, **kwargs):
        super(DistributedModel, self).__init__()

        assert len(workers) == len(devices) and len(workers) == len(model_shards)

        self.split_size = split_size
        self.rrefs = []
        for w in range(len(workers)):
            rref = rpc.remote(
                workers[w],
                model_shards[w],
                args = (devices[w],) + args,
                **kwargs
            )
            self.rrefs.append(rref)
            
    def forward(self, xs):
        # Split the input batch xs into micro-batches, and collect async RPC
        # futures into a list
        out_futures = []
        for x in iter(xs.split(self.split_size, dim=0)):
            x_rref = RRef(x)
            y_rref = self.rrefs[0].remote().forward(x_rref)
            for i in range(len(self.rrefs)):
                if i != 0:       
                    y_rref = self.rrefs[i].rpc_async().forward(y_rref)
                    out_futures.append(y_rref)

        # collect and cat all output tensors into one tensor.
        return torch.cat(torch.futures.wait_all(out_futures))

    def parameter_rrefs(self):
        remote_params = []
        for i in range(len(self.rrefs)):
            remote_params.extend(self.rrefs[i].remote().parameter_rrefs().to_here())
        return remote_params
