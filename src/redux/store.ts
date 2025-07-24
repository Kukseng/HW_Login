import {configureStore} from '@reduxjs/toolkit'
import { baseApi } from './baseApi';
import  authSlice  from './features/auth/authSlice';
import  counterSlice  from './features/counter/counterSlice';
import cartSlice from './features/cart/cartSlice'

export const makeStore = () =>{
    return configureStore({
        reducer:{
           [baseApi.reducerPath]:baseApi.reducer,
            auth: authSlice,
            counter: counterSlice,
            cart : cartSlice
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']