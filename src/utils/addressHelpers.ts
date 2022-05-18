import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const defChainId = 56
  return address[chainId] ? address[chainId] : address[defChainId]
}

export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWbnbAddress = () => {
  return getAddress(tokens.wbnb.address)
}

export const getCoinAddress = () => {
  return getAddress(addresses.coinAddress)
}
export const getCoinPairAddress = () => {
  return getAddress(addresses.coinPairAddress)
}
export const getFactoryCreatorAddress = ()=>{
  return getAddress(addresses.stakingFactoryCreator)
}
export const getIdoFactoryAddress = ()=>{
  return getAddress(addresses.idoFactoryV1)
}
export const getIdoFactoryAddressV2 = ()=>{
  return getAddress(addresses.idoFactoryV2)
}
