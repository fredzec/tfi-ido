import moment from "moment/moment"

export const getIdoPoolsConfigV3 = async () => {
  try {
    const url = "https://raw.githubusercontent.com/fredzec/config/main/poolsV3.json"
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

    return await response.json()
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
