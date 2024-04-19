import { IdoConfigV2 } from "../types"
import { convertTimeStr, getIdoPoolsConfigV3 } from "./helpers"
// import axios from "axios"
import { DEFAULT_TOKEN_DECIMAL } from "../../config"
import multicall from "../../utils/multicall"
import bep20Abi from "../../config/abi/erc20.json"
import BigNumber from "bignumber.js"

export const fetchIdoPools = async (poolId?: number) => {
  const [poolList] = await Promise.all([
    getIdoPoolsConfigV3(),
  ])
  const curChainName = process.env.REACT_APP_CHAIN_NAME
  const poolListByChain = poolList[curChainName]
  let targetPool: any
  if (poolId) {
    targetPool = poolListByChain.find((item) => item.poolId === poolId);
  }
  const poolListToFetch = targetPool ? [targetPool] : poolListByChain
  // const totalAmountRet = await axios.post('/api/queryIdoPoolDetail', { poolIdList: poolListToFetch.map((o) => o.poolId) }, {
  //   baseURL: V3_BASE_URL,
  // })
  const data: IdoConfigV2[] = await Promise.all(
    poolListToFetch.map(async (pool: any) => {
      const calls2 = [
        {
          address: pool.supportCommToken,
          name: 'balanceOf',
          params: [pool.receiverAddress],
        },
      ]
      const [
        [balance,],
      ] = await Promise.all([
        multicall(bep20Abi, calls2),
      ])
      const idoPool: IdoConfigV2 = {
        ...pool,
        poolId: pool.poolId,
        nameKey: encodeURIComponent(pool.name),
        endTime: convertTimeStr(pool.endTime),
        startTime: convertTimeStr(pool.startTime),
        amount: new BigNumber(balance[0].toString()).div(DEFAULT_TOKEN_DECIMAL).toFixed(3),
        supportCommToken: pool.supportCommToken,
        supportCommTokenDecimals: pool.supportCommTokenDecimals,
        poolMaxAmount: pool.hardCap,
        isBSC: true,
        startTimeForShow: pool.startTime,
        endTimeForShow: pool.endTime,
        startAmountOfThisPool: pool.startAmountOfThisPool,
        totalAmountOfThisPool: pool.totalAmountOfThisPool,
        receiverAddress: pool.receiverAddress,
      }
      return idoPool
    })
  )
  // 根据配置的顺序组织poolList的显示
  return data.filter((config) => !!config)
}
