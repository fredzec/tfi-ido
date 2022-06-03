import { getIdoFactoryAddressV2 } from "../../utils/addressHelpers";
import multicall from "../../utils/multicall";
import idoFactoryV2Abi from "config/abi/TrustFiIDOFactoryV2.json"
import erc20Abi from "config/abi/erc20.json"
import { IdoConfigV2 } from "../types";
import BigNumber from "bignumber.js";
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_TOKEN_ZERO_ADDRESS } from "../../config";
import { getIdoPoolsConfig } from "./helpers";
import { IdoDefaultData } from "../../config/constants/idos";

export const fetchIdoPools = async()=>{
  const idoFactoryAddress = getIdoFactoryAddressV2()
  // get pool length
  const calls = [
    {
      address: idoFactoryAddress,
      name: 'poolCount',
      params: [],
    },
    {
      address: idoFactoryAddress,
      name: 'supportCommission',
      params: [],
    },
  ]
  const [
    poolCountData,
    supportCommissionData,
  ] = await multicall(idoFactoryV2Abi, calls)

  const poolCount = Number(poolCountData[0].toString())
  const poolInfoList = await getIdoPoolsConfig()
  const curChainName = process.env.REACT_APP_CHAIN_NAME
  const poolInfoChain = poolInfoList[curChainName]

  const data:IdoConfigV2[] = await Promise.all(
    [...Array(poolCount)].map(async (_,index)=>{
      const calls1 = [
        {
          address: idoFactoryAddress,
          name: 'getPoolStakeInfo',
          params: [index],
        },
        {
          address: idoFactoryAddress,
          name: 'poolWhiteListAmount',
          params: [index],
        },
      ]
      const [
        poolStakeInfoData,
      ] = await multicall(idoFactoryV2Abi, calls1)
      let idoTokenDecimalsV = 18
      if(poolStakeInfoData[0].IDOToken!==DEFAULT_TOKEN_ZERO_ADDRESS){
        const calls2 = [
          {
            address: poolStakeInfoData[0].IDOToken,
            name: 'decimals',
            params: [],
          },
        ]
        const [
          decimals,
        ] = await multicall(erc20Abi, calls2)
        idoTokenDecimalsV = new BigNumber(decimals[0].toString()).toNumber()
      }
      const findLocal = poolInfoChain.find((item)=>item.poolId===index)??IdoDefaultData

      const idoPool: IdoConfigV2 = {
        ...findLocal,
        poolId: index,
        idoFactory: idoFactoryAddress,
        endTime: new BigNumber(poolStakeInfoData[0].endTime.toString()).times(1000).toNumber(),
        startTime: new BigNumber(poolStakeInfoData[0].startTime.toString()).times(1000).toNumber(),
        idoToken: poolStakeInfoData[0].IDOToken,
        idoTokenDecimals: idoTokenDecimalsV,
        amount: new BigNumber(poolStakeInfoData[0].amount.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        supportCommToken: supportCommissionData.supportCommToken,
        supportCommTokenDecimals: new BigNumber(supportCommissionData.decimals.toString()).toNumber(),
        // idoTokenSymbol: idoTokenSymbol[0].toString(),
        // idoTokenSymbol: findLocal.idoTokenSymbol,
        poolMaxAmount: new BigNumber(poolStakeInfoData[0].maxStakeAmount.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        claimStartTime: new BigNumber(poolStakeInfoData[0].claimStartTime.toString()).times(1000).toNumber(),
        claimEndTime: new BigNumber(poolStakeInfoData[0].claimEndTime.toString()).times(1000).toNumber(),
        claimRatio: new BigNumber( poolStakeInfoData[0].ratioToken.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        isBSC:  new BigNumber(poolStakeInfoData[0].isBSC.toString()).toNumber(),
        startTimeForShow: findLocal.startTime,
        endTimeForShow: findLocal.endTime
      }
      return idoPool
    })
  )
  // 根据配置的顺序组织poolList的显示
  return poolInfoChain
    .map((config) => data.find((pool) => pool.poolId === config.poolId))
    .filter((config) => !!config)
}
