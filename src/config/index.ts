import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3

export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const BASE_URL = 'https://trustfi.org'
export const BASE_EXCHANGE_URL = 'https://trustfi.org'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const BASE_BSC_SCAN_URL = 'https://bscscan.com'
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000
export const PHOTO_MAX_SIZE = 1000 * 1024; // 1M
export const DEFAULT_TOKEN_ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
// export const V3_BASE_URL = 'http://localhost:3000/'
export const V3_BASE_URL = 'https://farmer.trustfi.org/'


const walletSetMain = {
  scanLabel: 'View On BscScan',
  scanLink: 'https://bscscan.com/address/',
  helpLink: 'https://ethereum.org/wallets/',
  scanLinks: {
    56: 'https://bscscan.com/address/',
    97: 'https://testnet.bscscan.com/address/',
  }
}
const walletSetTest = {
  scanLabel: 'View On BscScan TestNet',
  scanLink: 'https://testnet.bscscan.com/address/',
  helpLink: 'https://ethereum.org/wallets/',
  scanLinks: {
    56: 'https://bscscan.com/address/',
    97: 'https://testnet.bscscan.com/address/',
  }
}
export const walletSet = walletSetMain
