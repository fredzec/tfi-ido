import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBep20Contract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { simpleRpcProvider } from 'utils/providers'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'
import {getCoinAddress, getCoinPairAddress, getIdoFactoryAddressV2} from '../utils/addressHelpers'
import multicall from '../utils/multicall'
import lpTokenAbi from '../config/abi/lpToken.json'
import {DEFAULT_TOKEN_ZERO_ADDRESS} from "../config";

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      try {
        const res = await contract.balanceOf(account)
        setBalanceState({ balance: new BigNumber(res.toString()), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}
export const useTokenBalanceOfIdoContractV2 = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const idoFactoryAddressV2 = getIdoFactoryAddressV2()
  // const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      if(tokenAddress === DEFAULT_TOKEN_ZERO_ADDRESS) return
      const contract = getBep20Contract(tokenAddress)
      try {
        const res = await contract.balanceOf(idoFactoryAddressV2)
        setBalanceState({ balance: new BigNumber(res.toString()), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (idoFactoryAddressV2) {
      fetchBalance()
    }
  }, [idoFactoryAddressV2, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      const res = await contract.balanceOf('0x000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res.toString()))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useGetBnbBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [balance, setBalance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        setBalance(new BigNumber(walletBalance.toString()))
        setFetchStatus(FetchStatus.SUCCESS)
      } catch {
        setFetchStatus(FetchStatus.FAILED)
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, lastUpdated, setBalance, setFetchStatus])

  return { balance, fetchStatus, refresh: setLastUpdated }
}

export const useGetTFITokenPrice = ()=>{
  const [balance, setBalance] = useState(BIG_ZERO)

  // tfi-usdt address
  const lpAddress = getCoinPairAddress()
  const coinAddress = getCoinAddress()
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const calls = [
          {
            address: lpAddress,
            name: 'token0',
            params: [],
          },
          {
            address: lpAddress,
            name: 'getReserves',
            params: [],
          },
        ]
        const [
          token0Data,
          reserveData,
        ] = await multicall(lpTokenAbi,calls)
        const token0 = token0Data.toString()
        if(reserveData){
          const res0 = new BigNumber(reserveData._reserve0.toString()).div(new BigNumber(10).pow(18))
          const res1 = new BigNumber(reserveData._reserve1.toString()).div(new BigNumber(10).pow(18))
          if( token0.toUpperCase() === coinAddress.toUpperCase() ){
            setBalance(res1.div(res0))
          }else{
            setBalance(res0.div(res1))
          }
        }
      }catch (e) {
        console.error(e)
      }
    }
    fetchBalance()
  }, [ setBalance,coinAddress,lpAddress])

  return balance

}

export default useTokenBalance
