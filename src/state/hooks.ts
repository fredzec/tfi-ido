import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { setBlock } from './actions'
import { State } from './types'
import useInterval from '../hooks/useInterval'
import { simpleRpcProvider } from '../utils/providers'
import useIsWindowVisible from '../hooks/useIsWindowVisible'

export const usePollBlockNumber = (refreshTime = 30000) => {
  const dispatch = useAppDispatch()
  const isWindowVisible = useIsWindowVisible()

  useInterval(
    () => {
      const fetchBlock = async () => {
        const blockNumber = await simpleRpcProvider.getBlockNumber()
        dispatch(setBlock(blockNumber))
      }

      fetchBlock()
    },
    isWindowVisible ? refreshTime : null,
    true,
  )
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}
