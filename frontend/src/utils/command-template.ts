export const getTensorParallelismCommand = (
    filePath: string,
    nnodes: number,
    nprocPerNode: number,
    rdzvId: number,
    rdzvBackend: string,
    rdzvEndpoint: string,
    epochs: number,
    batch_size: number,
    lr: number,
    useGPU: boolean,
    modelName: string
) => {
    let folderPath = filePath.slice(0, filePath.lastIndexOf("/"));
    let fileName = filePath.slice(filePath.lastIndexOf("/"), filePath.length);
    let cd = `${folderPath};`;
    let torchrun = `torchrun --nnodes=${nnodes} --nproc_per_node=${nprocPerNode} --rdzv_id=${rdzvId} --rdzv-backend=${rdzvBackend} --rdzv_endpoint="${rdzvEndpoint}" ${fileName} ${useGPU ? "--gpu=1" : ""} --epochs=${epochs} --batch_size=${batch_size} --lr=${lr}" --model_name="${modelName}"`
    return cd + torchrun
}

export const getPipelineParallelismCommand = (
    filePath: string,
    nnodes: number,
    nprocPerNode: number,
    masterAddr: string,
    masterPort: number,
    epochs: number,
    batch_size: number,
    lr: number,
    useGPU: boolean,
    modelName: string,
    nodeRank: number
) => {
    let folderPath = filePath.slice(0, filePath.lastIndexOf("/"));
    let fileName = filePath.slice(filePath.lastIndexOf("/"), filePath.length);
    let cd = `${folderPath};`;
    let torchrun = `torchrun --nnodes=${nnodes} --nproc_per_node=${nprocPerNode} --node_rank=${nodeRank} --master_addr=${masterAddr} --master_port=${masterPort} ${fileName} ${useGPU ? "--gpu=1" : ""} --use_syn --gpu=${useGPU} --epochs=${epochs} --batch_size=${batch_size} --lr=${lr}" --model_name="${modelName}"`
    return cd + torchrun
}