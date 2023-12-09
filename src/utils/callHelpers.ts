import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import {DEFAULT_TOKEN_DECIMAL} from "../config";

export const approve = async (Contract, address, account, amount?: any) => {
  const tx = await Contract.approve(address, amount || ethers.constants.MaxUint256)
  const receipt = await tx.wait()
  return receipt.status
}

export const stake = async (masterChefContract, pid, amount, account) => {
  try{
    const tx = await masterChefContract.stake(
      pid,
      new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toFixed(),
    )
    const receipt = await tx.wait()
    return receipt.status
  }catch (e) {
    console.error('stake error',e)
    return false
  }
}
export const stakeV2 = async (masterChefContract, pid, amount,userAddress, account) => {
  try{
    const tx = await masterChefContract.stake(
      pid,
      new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toFixed(),
      userAddress,
    )
    const receipt = await tx.wait()
    return receipt.status
  }catch (e) {
    console.error('stake error',e)
    return false
  }
}

export const refund = async (idoFactoryContract, pid) => {
  try{
    const tx = await idoFactoryContract.refund(pid)
    const receipt = await tx.wait()
    return receipt.status
  }catch (e) {
    console.error('refund error',e)
    return false
  }
}
export const claim = async (idoFactoryContract, pid) => {
  try{
    const tx = await idoFactoryContract.claim(pid)
    const receipt = await tx.wait()
    return receipt.status
  }catch (e) {
    console.error('claim error',e)
    return false
  }
}
export const claimOtherChain = async (idoFactoryContract, pid,address) => {
  try{
    const tx = await idoFactoryContract.claimOtherChain(pid,address)
    const receipt = await tx.wait()
    return receipt.status
  }catch (e) {
    console.error('claimOtherChain error',e)
    return false
  }
}

