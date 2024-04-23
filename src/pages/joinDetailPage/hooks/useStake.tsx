import { useCallback, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { stake, stakeV2 } from 'utils/callHelpers'
import { useIdoFactoryContract, useIdoFactoryContractV2 } from "../../../hooks/useContract"
import { useIdoState } from "../../../state/ido/hooks"
import { fetchIdoPoolsPublicDataAsync, fetchIdoPoolsUserDataAsync } from "../../../state/ido"
import { useIdoStateV2 } from "../../../state/idoV2/hooks"
import { fetchIdoPoolsPublicDataAsyncV2, fetchIdoPoolsUserDataAsyncV2 } from "../../../state/idoV2"
import { useIdoStateV3 } from "../../../state/idoV3/hooks"
import { ethers } from "ethers"
import erc20Abi from '../../../config/abi/erc20.json'
import useActiveWeb3React from "../../../hooks/useActiveWeb3React"
import axios from "axios"
import { V3_BASE_URL } from "../../../config"
import { Buffer } from "buffer"
import { fetchIdoPoolsPublicDataAsyncV3, fetchIdoPoolsUserDataAsyncV3 } from "../../../state/idoV3"


const useStake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const idoFactoryContract = useIdoFactoryContract()
  const { data: pools } = useIdoState()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(idoFactoryContract, pid, amount, account)
      dispatch(fetchIdoPoolsPublicDataAsync())
      dispatch(fetchIdoPoolsUserDataAsync({ account, pools }))
      return txHash
    },
    [account, dispatch, idoFactoryContract, pid, pools],
  )

  return { onStake: handleStake }
}

// v2
export const useStakeV2 = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const idoFactoryContract = useIdoFactoryContractV2()
  const { data: pools } = useIdoStateV2()

  const handleStake = useCallback(
    async (amount: string, userAddress: string) => {
      const txHash = await stakeV2(idoFactoryContract, pid, amount, userAddress, account)
      dispatch(fetchIdoPoolsPublicDataAsyncV2(null))
      dispatch(fetchIdoPoolsUserDataAsyncV2({ account, pools }))
      return txHash
    },
    [account, dispatch, idoFactoryContract, pid, pools],
  )

  return { onStake: handleStake }
}

// v3
export const useStakeV3 = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const { data: pools } = useIdoStateV3()
  const { library } = useActiveWeb3React()
  const usdtContract = useMemo(() => {
    return new ethers.Contract('0x55d398326f99059ff775485246999027b3197955', erc20Abi, library.getSigner())
  }, [library])
  const handleStake = useCallback(
    async (amount: string, receiverAddress: string, claimWalletAddress?: string) => {
      const txHash = await usdtContract.transfer(receiverAddress, ethers.utils.parseUnits(amount))
      console.log('result', txHash);
      const receipt = await txHash.wait();
      console.log('receipt', receipt);
      const incrAmountRet = await axios.post('/api/incrPoolAmount', {
        message: account,
        sig: ethers.utils.keccak256('0x' + Buffer.from(`tfi-ido_${account}_tfi-ido`, 'utf-8').toString('hex')),
        poolId: pid,
        amount,
        claimWalletAddress,
      }, {
        baseURL: V3_BASE_URL,
      })
      console.log('update amount ret', incrAmountRet.data)
      dispatch(fetchIdoPoolsPublicDataAsyncV3(pid))
      dispatch(fetchIdoPoolsUserDataAsyncV3({ account, pools }))
      return receipt
    },
    [account, dispatch, pid, pools],
  )

  return { onStake: handleStake }
}

export default useStake
