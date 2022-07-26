
export const getIdoPoolsConfig = async () => {
  try {
    // const url = "https://raw.githubusercontent.com/poppingc/config/main/poolsv2.config"
    const url = "https://raw.githubusercontent.com/fredzec/config/main/poolsv2.config"
    const response = await fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    if (!response.ok) {
      console.error(response)
      return {
        "BSC": [],
        "ETH":[],
        "polygon":[],
        "time": "2022-01-22"
      }
    }
    const data = await response.json()
    return data
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

export const getIdoPoolsClaimConfig = async () => {
  try {
    const url = "https://raw.githubusercontent.com/fredzec/config/main/claim.json"
    const response = await fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    if (!response.ok) {
      console.error(response)
      return {
        "poolList": [],
      }
    }
    return await response.json()
  }catch (e) {
    console.error(e)
    return {
      "poolList": [],
    }
  }
}
