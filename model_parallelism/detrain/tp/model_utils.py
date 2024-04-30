from torch.distributed._tensor.device_mesh import init_device_mesh

from torch.distributed.tensor.parallel import (
    parallelize_module
)
# Device Type: CUDA, CPU...
# Example:
# parallelize_plan={
#     "in_proj": ColwiseParallel(),
#     "out_proj": RowwiseParallel(),
# }
def get_tp_model(model, parallelize_plan, device_type, mesh_shape):
    device_mesh = init_device_mesh(device_type=device_type, mesh_shape=mesh_shape)
    model = model.to(device_type)
    tp_model = parallelize_module(
        module=model,
        device_mesh=device_mesh,
        parallelize_plan=parallelize_plan,
    )
    return tp_model