import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
// import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorLocalStorageKey } from 'trustfi-uikit'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import { useAppDispatch } from 'state'
import {useSnackbar} from "notistack";
import IconToastTheme from "../components/ToastView/IconToastTheme";

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { activate, deactivate } = useWeb3React()
  const { enqueueSnackbar } = useSnackbar();


  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            // error instanceof NoEthereumProviderError || error instanceof NoBscProviderError
            if (error instanceof NoEthereumProviderError ) {
              // toastError('Provider Error', 'No provider was found')
              enqueueSnackbar('error', {
                variant:'error' ,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                autoHideDuration: 2500,
                content: ((key, messages) => IconToastTheme({
                  id:key,
                  message: messages,
                  title: 'Provider Error',
                  description: 'No provider was found',
                  variant: 'danger'
                }))
              })
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              enqueueSnackbar('error', {
                variant:'error' ,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                autoHideDuration: 2500,
                content: ((key, messages) => IconToastTheme({
                  id:key,
                  message: messages,
                  title: 'Authorization Error',
                  description: 'Please authorize to access your account',
                  variant: 'danger'
                }))
              })
              // toastError('Authorization Error', 'Please authorize to access your account')
            } else {
              enqueueSnackbar('error', {
                variant:'error' ,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                autoHideDuration: 2500,
                content: ((key, messages) => IconToastTheme({
                  id:key,
                  message: messages,
                  title: error.name,
                  description: error.message,
                  variant: 'danger'
                }))
              })
              // toastError(error.name, error.message)
            }
          }
        })
      } else {
        // toastError('Unable to find connector', 'The connector config is wrong')
        enqueueSnackbar('error', {
          variant:'error' ,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          autoHideDuration: 2500,
          content: ((key, messages) => IconToastTheme({
            id:key,
            message: messages,
            title: 'Unable to find connector',
            description: 'The connector config is wrong',
            variant: 'danger'
          }))
        })
      }
    },
    [ activate],
  )

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
  }, [deactivate])

  return { login, logout }
}

export default useAuth
