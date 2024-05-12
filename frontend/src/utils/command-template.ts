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
    useGPU: string,
    modelName: string, 
    index
) => {
    let folderPath = filePath.slice(0, filePath.lastIndexOf("/"));
    let fileName = filePath.slice(filePath.lastIndexOf("/") + 1, filePath.length);
    let cd = `cd ${folderPath};`;
    let torchrun = `torchrun --nnodes=${nnodes} --node_rank=${index} --nproc_per_node=${nprocPerNode} --rdzv_id=${rdzvId} --rdzv-backend=${rdzvBackend} --rdzv_endpoint="${rdzvEndpoint}" ${fileName} --gpu="${useGPU}" --epochs=${epochs} --batch_size=${batch_size} --lr=${lr} --model_name="${modelName}";`
    return cd + torchrun
}

export const cloneGitCommand = (
    gitRepo: string,
    toFolder: string,
    isPrivate: boolean,
    userName?: string,
    password?: string
) => {
    if (!isPrivate) {
        return `git clone ${gitRepo} ${toFolder};`
    } else {
        let firstIndex = gitRepo.indexOf("github");
        let part1 = gitRepo.slice(0, firstIndex);
        let part2 = gitRepo.slice(firstIndex, gitRepo.length);
        return `git clone ${part1}${userName}:${password}@${part2} ${toFolder};`
    }
}

export const pullGitCommand = (
    gitRepo: string,
    toFolder: string,
    isPrivate: boolean,
    userName?: string,
    password?: string
) => {
    if (!isPrivate) {
        return `cd ${toFolder}; git pull;`
    } else {
        let firstIndex = gitRepo.indexOf("github");
        let part1 = gitRepo.slice(0, firstIndex);
        let part2 = gitRepo.slice(firstIndex, gitRepo.length);
        return `cd ${toFolder}; git pull ${part1}${userName}:${password}@${part2};`
    }

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
    useGPU: string,
    modelName: string,
    nodeRank: number
) => {
    let folderPath = filePath.slice(0, filePath.lastIndexOf("/"));
    let fileName = filePath.slice(filePath.lastIndexOf("/") + 1, filePath.length);
    let cd = `cd ${folderPath};`;
    let torchrun = `torchrun --nnodes=${nnodes} --nproc_per_node=${nprocPerNode} --node_rank=${nodeRank} --master_addr=${masterAddr} --master_port=${masterPort} ${fileName} --gpu="${useGPU}" --epochs=${epochs} --batch_size=${batch_size} --lr=${lr} --model_name="${modelName}"`
    return cd + torchrun
}