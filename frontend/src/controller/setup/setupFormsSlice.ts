import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SetupFormState = {
    id?: string,
    currentStep: number,
    downloadButtonEnable: boolean,
    deployments?: any[],
    parallelForm: {
        type: string,
        modelName: string,
        nnodes: number,
        nprocPerNode: number,
        batchSize: number,
        epochs: number,
        learningRate: number,
        akashOnly: boolean
    },
    nodesForm: {
        nodes: {protocol:string, ip: string, gpu: boolean, agentPort: number}[],
        masterNode?: {
            address: string,
            port: number
        },
        rendezvousBackend?: {
            id: number,
            backend: string,
            hostIP: string, 
            port: number
        }

    },
    trainingScriptForm: {
        repo: string,
        isPrivate: boolean,
        username?: string,
        password?: string,
        toFolder: string,
        isClone: boolean,
        filePath: string
    },
}


export const initialState: SetupFormState = {
    currentStep: 0,
    downloadButtonEnable: false,
    deployments: [],
    parallelForm: {
        type: "pipeline",
        modelName: "model_01",
        nnodes: 2,
        nprocPerNode: 1,
        batchSize: 40,
        epochs: 2,
        learningRate: 0.001,
        akashOnly: false
    },
    nodesForm: {
        nodes: [{protocol: "https", ip: "", gpu: false, agentPort: 80}],
        masterNode: {
            address: "localhost",
            port: 9999
        },
        rendezvousBackend: {
            id: 101,
            backend: "c10d",
            hostIP: "localhost",
            port: 9999
        }

    },
    trainingScriptForm: {
        repo: "",
        isPrivate: false,
        isClone: true,
        username: "",
        password: "",
        toFolder: "",
        filePath: ""
    },

}

export const setupFormsSlice = createSlice({
    name: 'setupForm',
    initialState: initialState,
    reducers: {
        setFormsProps: (state: SetupFormState, action: PayloadAction<{ att: string, value: any }>) => {
            state[action.payload.att] = action.payload.value
            if (action.payload.att === "parallelForm") {
                let nodes: {protocol: string, ip: string, gpu: boolean, agentPort: number}[] = state.nodesForm.nodes;
                let len = nodes.length
                if (state.parallelForm.nnodes < len) {
                    nodes = nodes.slice(0, state.parallelForm.nnodes)
                } else {
                    for(let i = 0; i < state.parallelForm.nnodes - len; i++) {
                        nodes.push({protocol: "https", ip: "", gpu: false, agentPort: 80})
                    }
                }
                
                state.nodesForm.nodes = nodes
            }
        },
        setFormsState: (state: SetupFormState, action: PayloadAction<SetupFormState>) => {
            Object.keys(action.payload).forEach(key => {
                state[key] = action.payload[key]
            }) 
        
        }
    }
})
export const { setFormsProps, setFormsState } = setupFormsSlice.actions;
export default setupFormsSlice.reducer;