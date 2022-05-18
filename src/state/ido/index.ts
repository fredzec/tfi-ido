import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IdoState, IdoConfig, IdoUserData } from '../types'
import {fetchIdoPools} from "./fetchIdoPools";
import {fetchIdoPoolsUserData} from "./fetchIdoPoolsUserData";

const initialState: IdoState = {
  data: [],
  dataLoaded: false,
  userDataLoaded: false,
  userData: [],
}

// Async thunks
export const fetchIdoPoolsPublicDataAsync = createAsyncThunk<IdoConfig[]>(
  'ido/fetchIdoPoolsPublicDataAsync',
  async () => {
    try {
      const pools = await fetchIdoPools()
      return pools
    }catch (e) {
      return []
    }
  },
)
export const fetchIdoPoolsUserDataAsync = createAsyncThunk<IdoUserData[],{account:string,pools: IdoConfig[]}>(
  'ido/fetchIdoPoolsUserDataAsync',
  async (options:{account:string,pools: IdoConfig[]}) => {
    try {
      const res = await fetchIdoPoolsUserData(options.pools,options.account)
      return res
    }catch (e) {
      return []
    }
  },
)

export const farmsSlice = createSlice({
  name: 'Ido',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIdoPoolsPublicDataAsync.fulfilled, (state, action) => {
      const idoPoolsData: IdoConfig[] = action.payload
      if(idoPoolsData.length>0) {
        state.data = idoPoolsData
      }
      state.dataLoaded = true
    })
    builder.addCase(fetchIdoPoolsUserDataAsync.fulfilled, (state, action) => {
      state.userDataLoaded = true
      state.userData = action.payload
    })
  },
})

export default farmsSlice.reducer
