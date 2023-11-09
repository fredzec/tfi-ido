import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import { IdoConfigV2, IdoStateV2, IdoUserDataV2, State } from '../types'
import { fetchIdoPoolsPublicDataAsyncV2, fetchIdoPoolsUserDataAsyncV2 } from './index'

export const useFetchIdoPoolsPublicDataV2 = (poolId?: number) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchIdoPoolsPublicDataAsyncV2(poolId))
  }, [dispatch, slowRefresh, poolId])
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

export const useImmediateFetchPoolsUserDataV2 = () => {
  const dispatch = useAppDispatch()
  const {account:accountV} = useWeb3React()
  const {data:idoPools } = useIdoStateV2()
  return useCallback(() => {
    dispatch(fetchIdoPoolsUserDataAsyncV2({ pools: idoPools, account: accountV }))
  }, [idoPools, accountV]);
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
