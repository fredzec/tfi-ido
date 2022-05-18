import { useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
import { State,IdoState, IdoConfig,IdoUserData } from '../types'
import { fetchIdoPoolsUserDataAsync, fetchIdoPoolsPublicDataAsync } from './index'
import {fetchIdoPoolsPublicDataAsyncV2} from "../idoV2";

export const useFetchIdoPoolsPublicData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchIdoPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

export const useFetchIdoPoolsUserData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const {account:accountV} = useWeb3React()
  const {data:idoPools } = useIdoState()
  useEffect(() => {
    if(accountV && idoPools.length){
      dispatch(fetchIdoPoolsUserDataAsync({pools:idoPools,account:accountV}))
    }
  }, [dispatch, slowRefresh,accountV,idoPools])

}

// ido Pools
export const useIdoState = (): IdoState => {
  const idoStateData = useSelector((state: State) => state.ido)
  return idoStateData
}

export const useGetIdoByNameKey = (key: string):IdoConfig => {
  const data = useSelector((state: State) => state.ido.data.find((item)=>item.nameKey===key))
  return data
}

export const useGetIdoUserDataById = (poolId: number):IdoUserData => {
  const data = useSelector((state: State) => state.ido.userData.find((item)=>item.poolId===poolId))
  return data
}

