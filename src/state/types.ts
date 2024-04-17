import BigNumber from 'bignumber.js'
import React from "react";

export type TranslatableText =
  | string
  | {
  key: string
  data?: {
    [key: string]: string | number
  }
}

export type SerializedBigNumber = string

// Block
export interface BlockState {
  currentBlock: number
  initialBlock: number
}

//  IDO
// ido pool config
export interface IdoConfig {
  poolId: number
  idoFactory: string
  // Millisecond Timestamp
  startTime: number
  startTimeForShow: string
  // Millisecond Timestamp
  endTime: number
  endTimeForShow: string
  amount: number
  idoToken: string
  supportCommToken: string
  poolMaxAmount: number

  // pool info
  name: string
  nameKey: string
  chainId: number
  type: string
  distribution: string
  idoTokenSymbol: string
  idoTokenPrice: number
  avatar?: string,
  subName?: string,
  tag?: string
  claimStarts: number
  launchTime: number
  vesting?: string
  claimRatio?: number
  description?:  string
  about?: string
  idoType?: string
  pic1?: string
  pic2?: string
  pic3?: string
  pic4?: string
  pic5?: string
  website?: string
  twitter?: string
  telegram?: string
}
export interface IdoConfigV2 {
  // -- pool stake info
  poolId: number
  idoFactory: string
  // Millisecond Timestamp pool start
  startTime: number
  startTimeForShow: string
  // Millisecond Timestamp pool end
  endTime: number
  endTimeForShow: string

  claimStartTime: number
  claimEndTime: number
  amount: number
  idoToken: string
  idoTokenDecimals: number
  supportCommToken: string
  supportCommTokenDecimals: number
  // poolMaxAmount is meaning maxStakeAmount
  poolMaxAmount: number
  // claimRatio is getPoolStakeInfo ratioToken
  claimRatio: number

  isBSC: number
  idoOnChainName: string
  idoOnChainLogo: string
  distributedName: string
  distributedLogo: string

  // -- pool info
  name: string
  nameKey: string
  chainId: number
  type: string
  distribution: string
  idoTokenSymbol: string
  idoTokenPrice: number
  avatar?: string,
  subName?: string,
  tag?: string
  claimStarts: number
  launchTime: number
  vesting?: string
  description?:  string
  about?: string
  idoType?: string
  pic1?: string
  pic2?: string
  pic3?: string
  pic4?: string
  pic5?: string
  website?: string
  twitter?: string
  telegram?: string

  // 远程配置信息
  configClaimUrl?: string
  startAmountOfThisPool?: number
  totalAmountOfThisPool?: number
  receiverAddress?: string
}
export interface IdoUserData {
  poolId: number
  canAmounts: number
  poolWhiteList: number
  stakeAmount: number
  supportCommTokenBalance: string
  claimed?: number
}
export interface IdoUserDataV2 {
  poolId: number
  // user can stake amount
  canAmounts: number
  // user max stake amount in pool whitelist set
  maxStakeAmount: number
  // abi data --
  // stakeAmount is amount in abi
  stakeAmount: number
  whiteListAmount: number
  claimAmount: number
  lastStakeTime: number
  //
  supportCommTokenBalance: string
  claimed?: number
}
export interface IdoUserDataV3 {
  poolId: number
  stakeAmount?: number
  canClaimAmount?: number
  lastStakeTime?: number
  supportCommTokenBalance?: string
  claimedAmount?: number
}
export interface IdoState {
  data: IdoConfig[]
  dataLoaded: boolean
  userData: IdoUserData[]
  userDataLoaded: boolean
}
export interface IdoStateV2 {
  data: IdoConfigV2[]
  dataLoaded: boolean
  userData: IdoUserDataV2[]
  userDataLoaded: boolean
}
export interface IdoStateV3 {
  data: IdoConfigV2[]
  dataLoaded: boolean
  userData: IdoUserDataV3[]
  userDataLoaded: boolean
}
// Global state
export interface State {
  block: BlockState
  ido:  IdoState
  idoV2: IdoStateV2
  idoV3: IdoStateV3
}
