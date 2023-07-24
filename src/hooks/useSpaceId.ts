import axios from "axios";
import { useEffect, useState } from "react";
import useActiveWeb3React from "./useActiveWeb3React";

const useSpaceId = () => {
  const { account } = useActiveWeb3React()
  const [spaceIdName, setSpaceIdName] = useState('');
  useEffect(() => {
    const fetchName = async () => {
      const ret = await axios.get('https://farmer.trustfi.org/api/querySid', {
        params: {
          tld: 'bnb',
          address: account,
          // address: '0x2e552E3aD9f7446e9caB378c008315E0C26c0398'
        }
      })
      if (ret.data.code === 0 && ret.data.name) {
        setSpaceIdName(ret.data.name);
      }
    };
    if (!account) return;
    fetchName().catch();
  }, [account])
  return spaceIdName;
}

export default useSpaceId;
