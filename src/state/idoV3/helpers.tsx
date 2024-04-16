import moment from "moment/moment"

export const getIdoPoolsConfigV3 = async () => {
  try {
    return {
      "BSC": [
        {
          "poolId": 3001,
          "name": "Copycat",
          "type": "IDO",
          "distribution": "Airdrop",
          "avatar": "https://pbs.twimg.com/profile_images/1413138175589945350/ZoZ7YS-y_400x400.jpg",
          "subName": "$eCAT",
          "claimStarts": 0,
          "idoTokenPrice": 0.8,
          "vesting": "12 month, daily linear vesting.",
          "claimRatio": 0.55,
          "description": "Copycat DEX is an on-chain derivatives protocol developed by the Copycat Finance team, offering multi-chain decentralized perpetual contract services for derivatives.",
          "about": "Copycat DEX is an on-chain derivatives protocol developed by the Copycat Finance team, offering multi-chain decentralized perpetual contract services for derivatives. Utilizing the advantages of decentralized networks (Layer 2), Copycat Dex is based on the innovative \"Point-to-Pool\" \"PvP-AMM\" protocol, aiming to save time costs and significantly reduce transaction costs (as low as 0.03% transaction fees) by optimizing the trading process. Its goal is to break industry barriers and provide a user experience closer to that of centralized exchanges (CEX), creating a convenient, efficient, and secure trading environment with user experience as the top priority.Copycat DEX is committed to providing unprecedented trading efficiency and security through innovative technology, bringing a new trading experience to users. By combining efficient trading mechanisms, optimized security measures, and a diverse range of financial products, Copycat DEX has become a leader in the cryptocurrency trading market.",
          "idoType": "Private Sale",
          "pic1": "",
          "pic2": "",
          "pic3": "",
          "pic4": "",
          "pic5": "",
          "website": "https://www.copycatdex.io/home",
          "twitter": "",
          "telegram": "",
          "chainName": "BSC",
          "startTime": "11AM 04/17/2024 UTC",
          "endTime": "11AM 04/19/2024 UTC",
          "idoTokenSymbol":"$eCAT",
          "idoOnChainName":"BSC",
          "idoOnChainLogo":"https://www.trustfi.org/launchpad/bnb.png",
          "distributedName":"BSC",
          "distributedLogo":"https://www.trustfi.org/launchpad/bnb.png",
          "supportCommToken": "0x55d398326f99059ff775485246999027b3197955",
          "supportCommTokenDecimals": 18
        }
      ]
    }
    // const url = "https://raw.githubusercontent.com/fredzec/config/main/poolsV3.json"
    // const response = await fetch(url, {
    //   method: 'get',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    // })
    // if (!response.ok) {
    //   console.error(response)
    //   return {
    //     "BSC": [],
    //     "ETH":[],
    //     "polygon":[],
    //     "time": "2022-01-22"
    //   }
    // }
    //
    // return await response.json()
  }catch (e) {
    console.error(e)
    return {
      "BSC": [],
      "ETH":[],
      "polygon":[],
      "time": "2022-01-22"
    }
  }
}

export const convertTimeStr = (str: string): number => {
  return moment(str.replace('UTC', '+0000'), 'hA MM/DD/YYYY Z').toDate().getTime()
}
