import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, SetupFormState } from '../setup/setupFormsSlice';

export type PipelineState = {
    pipelines: {_id: string, state: SetupFormState}[],
    currentPipeline: SetupFormState
}


const initialPLState: PipelineState = {
    pipelines: [],
    currentPipeline: initialState
}

export const pipelineSlice = createSlice({
    name: 'pipeline',
    initialState: initialPLState,
    reducers: {
        setList: (state: PipelineState, action: PayloadAction<any[]>) => {
            state.pipelines = action.payload
        }
    }
})
export const { setList } = pipelineSlice.actions;
export default pipelineSlice.reducer;