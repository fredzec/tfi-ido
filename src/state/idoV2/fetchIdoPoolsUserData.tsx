import {IdoConfig, IdoConfigV2, IdoUserData, IdoUserDataV2} from "../types";
import multicall from "../../utils/multicall";
import idoFactoryAbi from "../../config/abi/TrustFiIDOFactoryV1.abi.json";
import idoFactoryV2Abi from "config/abi/TrustFiIDOFactoryV2.json"

import { getIdoFactoryAddressV2} from "../../utils/addressHelpers";
import BigNumber from "bignumber.js";
import {DEFAULT_TOKEN_DECIMAL} from "../../config";
import bep20Abi from "../../config/abi/erc20.json";

export const fetchIdoPoolsUserData = async (pools: IdoConfigV2[],account:string,)=>{
  const idoFactoryAddress = getIdoFactoryAddressV2()
  const data:IdoUserDataV2[] = await Promise.all(
    pools.map( async (item)=>{
      // getPoolUserStakeAmount : The amount users are currently able to stake ,
      // if amount Reaching the upper limit，return 0

      // getUserStakeInfo is get  user staked  amount  info
      const calls = [
        {
          address: idoFactoryAddress,
          name: 'getUserStakeInfo',
          params: [item.poolId,account],
        },
        {
          address: idoFactoryAddress,
          name: 'getPoolUserStakeAmount',
          params: [item.poolId,account],
        },
        {
          address: idoFactoryAddress,
          name: 'poolWhiteList',
          params: [item.poolId,account],
        },
        {
          address: idoFactoryAddress,
          name: 'getPoolWhiteList',
          params: [item.poolId],
        },
        {
          address: idoFactoryAddress,
          name: 'userStakeRange',
          params: [item.poolId,account],
        },
      ]
      const [
        userStakeInfo,
        poolUserStakeAmount,
        poolWhiteList,
        getPoolWhiteList,
        userStakeRange,
      ] = await multicall(idoFactoryV2Abi, calls)
      const poolWhiteListData  = getPoolWhiteList[0]
      const curUserPoolWhiteList = poolWhiteListData.find((item)=>item.user.toString().toLowerCase() === account.toLowerCase())

      const calls2 = [
        {
          address: item.supportCommToken,
          name: 'balanceOf',
          params: [account],
        },
      ]
      const [
        balance,
      ] = await multicall(bep20Abi, calls2)

      const stakeAmountV = new BigNumber(userStakeInfo[0].amount.toString()).div(DEFAULT_TOKEN_DECIMAL)
      const idoUser: IdoUserDataV2 = {
        poolId: item.poolId,
        canAmounts: new BigNumber(userStakeRange.userMaxStakeAmount.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        maxStakeAmount: new BigNumber(poolUserStakeAmount.amount.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        stakeAmount: stakeAmountV.toNumber(),
        // poolWhiteList: new BigNumber(poolWhiteList[0].toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        whiteListAmount: curUserPoolWhiteList?new BigNumber(curUserPoolWhiteList.whiteListAmount.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber():0,
        supportCommTokenBalance: new  BigNumber(balance[0].toString()).div(DEFAULT_TOKEN_DECIMAL).toFixed(3),
        claimed: new BigNumber(item.idoTokenPrice).times(stakeAmountV).toNumber(),
        claimAmount: curUserPoolWhiteList?new BigNumber(curUserPoolWhiteList.claimAmount.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber():0,
        lastStakeTime: curUserPoolWhiteList?new BigNumber(curUserPoolWhiteList.lastStakeTime.toString()).times(1000).toNumber():0,
      }
      return idoUser
    })
  )
  return data
}
