import {getIdoFactoryAddress} from "../../utils/addressHelpers";
import multicall from "../../utils/multicall";
import idoFactoryAbi from "config/abi/TrustFiIDOFactoryV1.abi.json"
import erc20Abi from "config/abi/erc20.json"
import {IdoConfig} from "../types";
import BigNumber from "bignumber.js";
import {DEFAULT_TOKEN_DECIMAL} from "../../config";
import {getIdoPoolsConfig} from "./helpers";
import {IdoDefaultData} from "../../config/constants/idos";

export const fetchIdoPools = async()=>{
  const idoFactoryAddress = getIdoFactoryAddress()
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
  ] = await multicall(idoFactoryAbi, calls)
  const poolCount = Number(poolCountData[0].toString())
  const poolInfoList = await getIdoPoolsConfig()
  const curChainName = process.env.REACT_APP_CHAIN_NAME
  const poolInfoChain = poolInfoList[curChainName]

  const data:IdoConfig[] = await Promise.all(
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
        poolWhiteListAmountData,
      ] = await multicall(idoFactoryAbi, calls1)
      // const calls2 = [
      //   {
      //     address: poolStakeInfoData[0].IDOToken,
      //     name: 'symbol',
      //     params: [],
      //   },
      // ]
      // const [
      //   idoTokenSymbol,
      // ] = await multicall(erc20Abi, calls2)

      // const findLocal = IdoPoolsLocal.find((item)=>item.poolId===index)
      const findLocal = poolInfoChain.find((item)=>item.poolId===index)??IdoDefaultData

      const idoPool: IdoConfig = {
        ...findLocal,
        poolId: index,
        idoFactory: idoFactoryAddress,
        endTime: new BigNumber(poolStakeInfoData[0].endTime.toString()).times(1000).toNumber(),
        startTime: new BigNumber(poolStakeInfoData[0].startTime.toString()).times(1000).toNumber(),
        idoToken: poolStakeInfoData[0].IDOToken,
        amount: new BigNumber(poolStakeInfoData[0].amount.toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        supportCommToken: supportCommissionData.supportCommToken,
        // idoTokenSymbol: idoTokenSymbol[0].toString(),
        // idoTokenSymbol: findLocal.idoTokenSymbol,
        poolMaxAmount: new BigNumber(poolWhiteListAmountData[0].toString()).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
      }
      return idoPool
    })
  )

  const poolIds = poolInfoChain.map((item)=>{return item.poolId})
  const fliterData = data.filter((item)=>  poolIds.includes(item.poolId))
  return fliterData
}

export default null
