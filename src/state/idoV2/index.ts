import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {IdoState, IdoConfig, IdoUserData, IdoUserDataV2, IdoStateV2, IdoConfigV2} from '../types'
import {fetchIdoPools} from "./fetchIdoPools";
import {fetchIdoPoolsUserData} from "./fetchIdoPoolsUserData";

const initialState: IdoStateV2 = {
  data: [],
  dataLoaded: false,
  userDataLoaded: false,
  userData: [],
}

// Async thunks
export const fetchIdoPoolsPublicDataAsyncV2 = createAsyncThunk<IdoConfigV2[], number | null>(
  'idoV2/fetchIdoPoolsPublicDataAsyncV2',
  async (poolId?: number) => {
    try {
      const pools = await fetchIdoPools(poolId)
      return pools
    }catch (e) {
      return []
    }
  },
)
export const fetchIdoPoolsUserDataAsyncV2 = createAsyncThunk<IdoUserDataV2[],{account:string,pools: IdoConfigV2[]}>(
  'idoV2/fetchIdoPoolsUserDataAsyncV2',
  async (options:{account:string,pools: IdoConfigV2[]}) => {
    try {
      const res = await fetchIdoPoolsUserData(options.pools,options.account)
      return res
    }catch (e) {
      return []
    }
  },
)

export const idoV2Slice = createSlice({
  name: 'IdoV2',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIdoPoolsPublicDataAsyncV2.fulfilled, (state, action) => {
      const idoPoolsData: IdoConfigV2[] = action.payload
      if(idoPoolsData.length>0) {
        state.data = idoPoolsData
      }
      state.dataLoaded = true
    })
    builder.addCase(fetchIdoPoolsUserDataAsyncV2.fulfilled, (state, action) => {
      state.userDataLoaded = true
      state.userData = action.payload
    })
  },
})

export default idoV2Slice.reducer
