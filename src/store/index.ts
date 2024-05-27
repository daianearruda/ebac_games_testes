import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit'

import carrinhoReducer from './reducers/carrinho'

import api from '../services/api'

// import carrinho from './reducers/carrinho'

// export const store = configureStore({
//   reducer: {
//     carrinho: carrinhoReducer,
//     [api.reducerPath]: api.reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware)
// })
const rootReducer = combineReducers({
  carrinho: carrinhoReducer,
  [api.reducerPath]: api.reducer
})

export function configuraStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>

// export type RootReducer = ReturnType<typeof store.getState>

export type AppStore = ReturnType<typeof configuraStore>
