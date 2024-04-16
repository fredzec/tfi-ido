import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import { IdoConfigV2, IdoStateV3, IdoUserDataV3, State } from '../types'
import { fetchIdoPoolsPublicDataAsyncV3, fetchIdoPoolsUserDataAsyncV3 } from './index'

export const useFetchIdoPoolsPublicDataV3 = (poolId?: number) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchIdoPoolsPublicDataAsyncV3(poolId))
  }, [dispatch, slowRefresh, poolId])
}

export const useFetchIdoPoolsUserDataV3 = (poolId?: number) => {
  const dispatch = useAppDispatch()
  const { account: accountV } = useWeb3React()
  const idoPools = useSelector((state: State) => state.idoV3.data)
  useEffect(() => {
    if (poolId && idoPools.length > 1) {
      return
    }
    if (accountV && idoPools.length) {
      dispatch(fetchIdoPoolsUserDataAsyncV3({ pools: idoPools, account: accountV }))
    }
  }, [dispatch, accountV, idoPools, poolId])
}

export const useImmediateFetchPoolsUserDataV3 = () => {
  const dispatch = useAppDispatch()
  const { account: accountV } = useWeb3React()
  const { data: idoPools } = useIdoStateV3()
  return useCallback(() => {
    dispatch(fetchIdoPoolsUserDataAsyncV3({ pools: idoPools, account: accountV }))
  }, [idoPools, accountV])
}

// ido Pools
export const useIdoStateV3 = (): IdoStateV3 => {
  return useSelector((state: State) => state.idoV3)
}

export const useGetIdoByIdV3 = (poolId: number):IdoConfigV2 => {
  return useSelector((state: State) => state.idoV3.data.find((item) => item.poolId === poolId))
}

export const useGetIdoUserDataByIdV3 = (poolId: number):IdoUserDataV3 => {
  return useSelector((state: State) => state.idoV3.userData.find((item) => item.poolId === poolId))
}

