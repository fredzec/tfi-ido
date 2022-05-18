import {useWeb3React} from "@web3-react/core";
import {getBep20Contract} from "../../../utils/contractHelpers";
import {useCallback} from "react";
import {approve} from "../../../utils/callHelpers";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import {getIdoFactoryAddress, getIdoFactoryAddressV2} from "../../../utils/addressHelpers";
import BigNumber from "bignumber.js";

// approve supportCommToken to IDOFactory Contract
export const useApproveTokenToFactory = () =>{
  const { account } = useWeb3React()
  const { library } = useActiveWeb3React()
  const idoFactoryAdd = getIdoFactoryAddress()

  // approve
  const handleApprove = useCallback(async (token: string) => {
    try {
      const tokenContract = getBep20Contract(token,library.getSigner())
      const tx = await approve(tokenContract, idoFactoryAdd, account)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, library, idoFactoryAdd])

  // approve checked
  const handleAllowances = useCallback(async (token: string) => {
    if(token===''|| !token || !account) return false
    try {
      const tokenContract = getBep20Contract(token,library.getSigner())
      const res = await tokenContract.allowance(
        account, idoFactoryAdd
      )

      const allowance = new BigNumber(res.toString())
      return allowance.isGreaterThan(0)
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, library,idoFactoryAdd])

  return {
    onApproveSupportCommToken: handleApprove,
    onAllowanceSupportCommToken: handleAllowances,
  }
}
// approve supportCommToken to IDOFactory Contract V2
export const useApproveTokenToFactoryV2 = () =>{
  const { account } = useWeb3React()
  const { library } = useActiveWeb3React()
  const idoFactoryAdd = getIdoFactoryAddressV2()

  // approve
  const handleApprove = useCallback(async (token: string) => {
    try {
      const tokenContract = getBep20Contract(token,library.getSigner())
      const tx = await approve(tokenContract, idoFactoryAdd, account)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, library, idoFactoryAdd])

  // approve checked
  const handleAllowances = useCallback(async (token: string) => {
    if(token===''|| !token || !account) return false
    try {
      const tokenContract = getBep20Contract(token,library.getSigner())
      const res = await tokenContract.allowance(
        account, idoFactoryAdd
      )

      const allowance = new BigNumber(res.toString())
      return allowance.isGreaterThan(0)
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, library,idoFactoryAdd])

  return {
    onApproveSupportCommToken: handleApprove,
    onAllowanceSupportCommToken: handleAllowances,
  }
}
