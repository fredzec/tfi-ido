import bnb from "common/images/bnb.png";
const Chains = {
  56: {
    name: 'BSC',
    icon: bnb
  },
  97: {
    name: 'BSC',
    icon: bnb
  },
}

export const getChainInfo =  (chainId:number)=>{
  return Chains[chainId]
}
