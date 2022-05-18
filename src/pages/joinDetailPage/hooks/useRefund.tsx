import {useAppDispatch} from "../../../state";
import {useWeb3React} from "@web3-react/core";
import {useIdoFactoryContractV2} from "../../../hooks/useContract";
import {useIdoStateV2} from "../../../state/idoV2/hooks";
import {useCallback} from "react";
import {refund, stake} from "../../../utils/callHelpers";
import {fetchIdoPoolsPublicDataAsyncV2, fetchIdoPoolsUserDataAsyncV2} from "../../../state/idoV2";

export const useRefund = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account ,chainId} = useWeb3React()
  const idoFactoryContract = useIdoFactoryContractV2()
  const {data:pools} = useIdoStateV2()

  const handleRefund = useCallback(
    async () => {
      const txHash = await refund(idoFactoryContract, pid)
      dispatch(fetchIdoPoolsPublicDataAsyncV2())
      dispatch(fetchIdoPoolsUserDataAsyncV2({account,pools}))
      return txHash
    },
    [account, dispatch, idoFactoryContract, pid,pools],
  )

  return { onRefund: handleRefund }
}

export default null