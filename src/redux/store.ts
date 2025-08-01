import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'
import authReducer from './features/auth/authSlice'
import cartReducer from './features/cart/cartSlice'
import counterReducer from './features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch