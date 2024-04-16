import { IdoConfigV2, IdoUserDataV3 } from "../types"
import multicall from "../../utils/multicall"
import BigNumber from "bignumber.js"
import { DEFAULT_TOKEN_DECIMAL } from "../../config"
import bep20Abi from "../../config/abi/erc20.json"

export const fetchIdoPoolsUserData = async (pools: IdoConfigV2[], account: string,) => {
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
        balance,
      ] = await multicall(bep20Abi, calls2)

      const idoUser: IdoUserDataV3 = {
        poolId: item.poolId,
        supportCommTokenBalance: new BigNumber(balance[0].toString()).div(DEFAULT_TOKEN_DECIMAL).toFixed(3),
      }
      return idoUser
    })
  )
  return data
}
