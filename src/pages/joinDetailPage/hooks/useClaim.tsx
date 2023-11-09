import {useAppDispatch} from "../../../state";
import {useWeb3React} from "@web3-react/core";
import {useIdoFactoryContractV2} from "../../../hooks/useContract";
import {useIdoStateV2} from "../../../state/idoV2/hooks";
import {useCallback} from "react";
import {claim, claimOtherChain} from "../../../utils/callHelpers";
import {fetchIdoPoolsPublicDataAsyncV2, fetchIdoPoolsUserDataAsyncV2} from "../../../state/idoV2";

export const useClaim = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account ,chainId} = useWeb3React()
  const idoFactoryContract = useIdoFactoryContractV2()
  const {data:pools} = useIdoStateV2()

  const handleClaim = useCallback(
    async () => {
      const txHash = await claim(idoFactoryContract, pid)
      dispatch(fetchIdoPoolsPublicDataAsyncV2(null))
      dispatch(fetchIdoPoolsUserDataAsyncV2({account,pools}))
      return txHash
    },
    [account, dispatch, idoFactoryContract, pid,pools],
  )

  return { onClaim: handleClaim }
}
export const useClaimOtherChain = (pid:number) => {
  const dispatch = useAppDispatch()
  const { account ,chainId} = useWeb3React()
  const idoFactoryContract = useIdoFactoryContractV2()
  const {data:pools} = useIdoStateV2()

  const handleClaim = useCallback(
    async (address: string) => {
      try {
        const txHash = await claimOtherChain(idoFactoryContract, pid,address)
        dispatch(fetchIdoPoolsPublicDataAsyncV2(null))
        dispatch(fetchIdoPoolsUserDataAsyncV2({account,pools}))
        return txHash
      }catch (e){
        console.error('ClaimOtherChain error',e)
        return false
      }
    },
    [account, dispatch, idoFactoryContract, pid,pools],
  )

  return { onClaimOtherChain: handleClaim }
}

export default null
