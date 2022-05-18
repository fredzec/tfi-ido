import { useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
import {State, IdoUserData, IdoStateV2, IdoConfigV2, IdoUserDataV2} from '../types'
import { fetchIdoPoolsUserDataAsyncV2, fetchIdoPoolsPublicDataAsyncV2 } from './index'

export const useFetchIdoPoolsPublicDataV2 = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchIdoPoolsPublicDataAsyncV2())
  }, [dispatch, slowRefresh])
}

export const useFetchIdoPoolsUserDataV2 = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const {account:accountV} = useWeb3React()
  const {data:idoPools } = useIdoStateV2()
  useEffect(() => {
    if(accountV && idoPools.length){
      dispatch(fetchIdoPoolsUserDataAsyncV2({pools:idoPools,account:accountV}))
    }
  }, [dispatch, slowRefresh,accountV,idoPools])

}

// ido Pools
export const useIdoStateV2 = (): IdoStateV2 => {
  const idoStateData = useSelector((state: State) => state.idoV2)
  return idoStateData
}

export const useGetIdoByNameKeyV2 = (key: string):IdoConfigV2 => {
  const data = useSelector((state: State) => state.idoV2.data.find((item)=>item.nameKey===key))
  return data
}

export const useGetIdoUserDataByIdV2 = (poolId: number):IdoUserDataV2 => {
  const data = useSelector((state: State) => state.idoV2.userData.find((item)=>item.poolId===poolId))
  return data
}
