import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import processReducer from './process/processSlice';
import setupFormsReducer from './setup/setupFormsSlice';
import pipelineReducer from './pipeline/pipelineSlice';

export function makeStore() {
    return configureStore({
        reducer: {
            process: processReducer,
            setupForms: setupFormsReducer,
            pipeline: pipelineReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>  