import { IdoConfigV2, IdoUserDataV3 } from "../types"
import multicall from "../../utils/multicall"
import BigNumber from "bignumber.js"
import { DEFAULT_TOKEN_DECIMAL, V3_BASE_URL } from "../../config"
import bep20Abi from "../../config/abi/erc20.json"
import axios from "axios"

export const fetchIdoPoolsUserData = async (pools: IdoConfigV2[], account: string,) => {
  const totalAmountRet = await axios.post(
    '/api/queryIdoPoolDetail',
    {
      poolIdList: pools.map((o) => o.poolId),
      userAddress: account,
    },
    {
      baseURL: V3_BASE_URL,
    }
  )
  const data: IdoUserDataV3[] = await Promise.all(
    pools.map(async (item) => {
      const calls2 = [
        {
          address: item.supportCommToken,
          name: 'balanceOf',
          params: [account],
        },
      ]
      const [
        [balance,],
      ] = await Promise.all([
        multicall(bep20Abi, calls2),
      ])

      const idoUser: IdoUserDataV3 = {
        poolId: item.poolId,
        supportCommTokenBalance: new BigNumber(balance[0].toString()).div(DEFAULT_TOKEN_DECIMAL).toFixed(3),
        stakeAmount: totalAmountRet.data?.userAmount?.[item.poolId] ?? 0,
      }
      return idoUser
    })
  )
  return data
}
