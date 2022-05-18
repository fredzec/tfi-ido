import {IdoConfig, IdoUserData} from "../types";
import multicall from "../../utils/multicall";
import idoFactoryAbi from "../../config/abi/TrustFiIDOFactoryV1.abi.json";
import {getIdoFactoryAddress} from "../../utils/addressHelpers";
import BigNumber from "bignumber.js";
import {DEFAULT_TOKEN_DECIMAL} from "../../config";
import bep20Abi from "../../config/abi/erc20.json";

export const fetchIdoPoolsUserData = async (pools: IdoConfig[],account:string,)=>{
  const idoFactoryAddress = getIdoFactoryAddress()
  const data:IdoUserData[] = await Promise.all(
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
      ]
      const [
        userStakeInfo,
        poolUserStakeAmount,
        poolWhiteList,
      ] = await multicall(idoFactoryAbi, calls)

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
      const idoUser: IdoUserData = {
        poolId: item.poolId,
        canAmounts: new BigNumber(poolUserStakeAmount.amount.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        stakeAmount: stakeAmountV.toNumber(),
        poolWhiteList: new BigNumber(poolWhiteList[0].toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        supportCommTokenBalance: new  BigNumber(balance[0].toString()).div(DEFAULT_TOKEN_DECIMAL).toFixed(3),
        claimed: new BigNumber(item.idoTokenPrice).times(stakeAmountV).toNumber()
      }
      return idoUser
    })
  )
  return data
}

export default null
