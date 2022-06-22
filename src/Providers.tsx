import React from 'react'
import { ModalProvider } from 'trustfi-uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
import { SnackbarProvider } from 'notistack'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    top: '200px'
  }
}));


const Providers: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      dense={false}
      classes={{
        containerAnchorOriginTopRight: classes.root,
        containerAnchorOriginTopCenter: classes.root,
        containerAnchorOriginTopLeft: classes.root,
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
            <HelmetProvider>
              <ThemeContextProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
              </ThemeContextProvider>
            </HelmetProvider>
        </Provider>
      </Web3ReactProvider>
    </SnackbarProvider>

  )
}

export default Providers
