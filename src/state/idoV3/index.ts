import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IdoConfigV2, IdoStateV3, IdoUserDataV3 } from '../types'
import { fetchIdoPools } from "./fetchIdoPools"
import { fetchIdoPoolsUserData } from "./fetchIdoPoolsUserData"

const initialState: IdoStateV3 = {
  data: [],
  dataLoaded: false,
  userDataLoaded: false,
  userData: [],
}

// Async thunks
export const fetchIdoPoolsPublicDataAsyncV3 = createAsyncThunk<IdoConfigV2[], number | null>(
  'idoV3/fetchIdoPoolsPublicDataAsyncV3',
  async (poolId?: number) => {
    try {
      console.log('fetchIdoPoolsPublicDataAsyncV3', poolId)
      return await fetchIdoPools(poolId)
    } catch (e) {
      return []
    }
  },
)
export const fetchIdoPoolsUserDataAsyncV3 = createAsyncThunk<IdoUserDataV3[], {
  account: string,
  pools: IdoConfigV2[]
}>(
  'idoV2/fetchIdoPoolsUserDataAsyncV3',
  async (options: { account: string, pools: IdoConfigV2[] }) => {
    try {
      console.log('fetchIdoPoolsPublicDataAsyncV3', options)
      const res = await fetchIdoPoolsUserData(options.pools, options.account)
      return res
    } catch (e) {
      return []
    }
  },
)

export const idoV3Slice = createSlice({
  name: 'IdoV3',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIdoPoolsPublicDataAsyncV3.fulfilled, (state, action) => {
      const idoPoolsData: IdoConfigV2[] = action.payload
      if (idoPoolsData.length > 0) {
        state.data = idoPoolsData
      }
      state.dataLoaded = true
    })
    builder.addCase(fetchIdoPoolsUserDataAsyncV3.fulfilled, (state, action) => {
      state.userDataLoaded = true
      state.userData = action.payload
    })
  },
})

export default idoV3Slice.reducer
