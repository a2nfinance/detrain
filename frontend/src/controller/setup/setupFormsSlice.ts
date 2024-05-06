import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SetupFormState = {
    currentStep: number,
    downloadButtonEnable: boolean,
    parallelForm: {
        type: string,
        modelName: string,
        nnodes: number,
        nprocPerNode: number,
        batchSize: number,
        epochs: number,
        learningRate: number
    },
    nodesForm: {
        nodes: {ip: string, gpu: boolean}[],
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


const initialState: SetupFormState = {
    currentStep: 0,
    downloadButtonEnable: false,
    parallelForm: {
        type: "pipeline",
        modelName: "model_01",
        nnodes: 2,
        nprocPerNode: 1,
        batchSize: 120,
        epochs: 10,
        learningRate: 0.001
    },
    nodesForm: {
        nodes: [{ip: "", gpu: false}],
        masterNode: {
            address: "localhost",
            port: 9999
        },
        rendezvousBackend: {
            id: 101,
            backend: "c10d",
            hostIP: "localhost",
            port: 8000
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
        }
    }
})
export const { setFormsProps } = setupFormsSlice.actions;
export default setupFormsSlice.reducer;