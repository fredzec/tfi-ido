import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import blockReducer from './block'
import idoReducer from './ido'
import idoReducerV2 from './idoV2'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    ido: idoReducer,
    idoV2: idoReducerV2,
  },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppDispatch = () => useDispatch()

export default store
