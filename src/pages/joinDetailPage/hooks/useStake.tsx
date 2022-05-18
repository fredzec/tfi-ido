import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import {stake, stakeV2} from 'utils/callHelpers'
import {useIdoFactoryContract, useIdoFactoryContractV2} from "../../../hooks/useContract";
import {useIdoState} from "../../../state/ido/hooks";
import {fetchIdoPoolsPublicDataAsync, fetchIdoPoolsUserDataAsync} from "../../../state/ido";
import {useIdoStateV2} from "../../../state/idoV2/hooks";
import {fetchIdoPoolsPublicDataAsyncV2, fetchIdoPoolsUserDataAsyncV2} from "../../../state/idoV2";


const useStake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account ,chainId} = useWeb3React()
  const idoFactoryContract = useIdoFactoryContract()
  const {data:pools} = useIdoState()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(idoFactoryContract, pid, amount, account)
      dispatch(fetchIdoPoolsPublicDataAsync())
      dispatch(fetchIdoPoolsUserDataAsync({account,pools}))
      return txHash
    },
    [account, dispatch, idoFactoryContract, pid,pools],
  )

  return { onStake: handleStake }
}

// v2
export const useStakeV2 = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account ,chainId} = useWeb3React()
  const idoFactoryContract = useIdoFactoryContractV2()
  const {data:pools} = useIdoStateV2()

  const handleStake = useCallback(
    async (amount: string, userAddress: string) => {
      const txHash = await stakeV2(idoFactoryContract, pid, amount, userAddress,account)
      dispatch(fetchIdoPoolsPublicDataAsyncV2())
      dispatch(fetchIdoPoolsUserDataAsyncV2({account,pools}))
      return txHash
    },
    [account, dispatch, idoFactoryContract, pid,pools],
  )

  return { onStake: handleStake }
}

export default useStake
