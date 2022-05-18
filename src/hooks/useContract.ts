import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getMasterchefContract,
  getErc721Contract, getPairContract, getLpContract,
  getIdoFactoryContract, getIdoFactoryContractV2,
} from 'utils/contractHelpers'

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getErc721Contract(address, library.getSigner()), [address, library])
}

export const useMasterchef = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMasterchefContract(library.getSigner()), [library])
}
export const usePairContract = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getPairContract(address,library.getSigner()), [address,library])
}
export const useLpContract = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLpContract(address,library.getSigner()), [address,library])
}

export const useIdoFactoryContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getIdoFactoryContract(library.getSigner()), [library])
}
export const useIdoFactoryContractV2 = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getIdoFactoryContractV2(library.getSigner()), [library])
}
