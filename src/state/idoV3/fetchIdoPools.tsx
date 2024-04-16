import { IdoConfigV2 } from "../types"
import { convertTimeStr, getIdoPoolsConfigV3 } from "./helpers"

export const fetchIdoPools = async (poolId?: number) => {
  // 拉取单个池子信息
  if (poolId) {
    const [poolList] = await Promise.all([
      getIdoPoolsConfigV3(),
    ])
    const curChainName = process.env.REACT_APP_CHAIN_NAME
    const poolListByChain = poolList[curChainName]
    let idoTokenDecimalsV = 18
    const pool = poolListByChain.find((item) => item.poolId === poolId);
    const idoPool: IdoConfigV2 = {
      ...pool,
      poolId,
      endTime: convertTimeStr(pool.endTime),
      startTime: convertTimeStr(pool.startTime),
      idoToken: '',
      idoTokenDecimals: idoTokenDecimalsV,
      amount: 0,
      supportCommToken: pool.supportCommToken,
      supportCommTokenDecimals: pool.supportCommTokenDecimals,
      poolMaxAmount: 121212121212,
      isBSC: true,
      startTimeForShow: pool.startTime,
      endTimeForShow: pool.endTime,
      startAmountOfThisPool: pool.startAmountOfThisPool,
      totalAmountOfThisPool: pool.totalAmountOfThisPool,
    }

    return [idoPool];
  }
  // 拉取全部数据
  const [poolList] = await Promise.all([
    getIdoPoolsConfigV3(),
  ])
  const curChainName = process.env.REACT_APP_CHAIN_NAME
  const poolListByChain = poolList[curChainName]
  const data: IdoConfigV2[] = await Promise.all(
    poolListByChain.map(async (pool: any) => {
      const idoPool: IdoConfigV2 = {
        ...pool,
        poolId: pool.poolId,
        nameKey: encodeURIComponent(pool.name),
        endTime: convertTimeStr(pool.endTime),
        startTime: convertTimeStr(pool.startTime),
        idoToken: '0x00000',
        idoTokenDecimals: 18,
        amount: 0,
        supportCommToken: pool.supportCommToken,
        supportCommTokenDecimals: pool.supportCommTokenDecimals,
        poolMaxAmount: 12323232323,
        isBSC: true,
        startTimeForShow: pool.startTime,
        endTimeForShow: pool.endTime,
        startAmountOfThisPool: pool.startAmountOfThisPool,
        totalAmountOfThisPool: pool.totalAmountOfThisPool,
      }
      return idoPool
    })
  )
  // 根据配置的顺序组织poolList的显示
  return data.filter((config) => !!config)
}
