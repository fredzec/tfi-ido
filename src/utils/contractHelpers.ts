import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'

// Addresses
import {
  getAddress, getFactoryCreatorAddress, getIdoFactoryAddress, getIdoFactoryAddressV2,
  getMasterChefAddress,
  getMulticallAddress,
} from 'utils/addressHelpers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import masterChef from 'config/abi/masterchef.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import PAIRAbi from 'config/abi/pair.json'
import IdoFactoryV1Abi from 'config/abi/TrustFiIDOFactoryV1.abi.json'
import IdoFactoryV2Abi from 'config/abi/TrustFiIDOFactoryV2.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenAbi, address, signer)
}
export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, getMasterChefAddress(), signer)
}
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

export const getPairContract = (lpAddress:string,signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(PAIRAbi, lpAddress, signer)
}

export const getIdoFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(IdoFactoryV1Abi, getIdoFactoryAddress(), signer)
}

export const getIdoFactoryContractV2 = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(IdoFactoryV2Abi, getIdoFactoryAddressV2(), signer)
}

