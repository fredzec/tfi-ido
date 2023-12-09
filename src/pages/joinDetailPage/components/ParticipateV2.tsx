import React, { useCallback, useEffect, useState } from "react";
import { IdoConfigV2 } from "../../../state/types";
import { useApproveTokenToFactoryV2 } from "../hooks/useApprove";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";
import { useWalletModal } from "trustfi-uikit";
import { useStakeV2 } from "../hooks/useStake";
import { useSnackbar } from "notistack";
import { Collapse } from "@material-ui/core";
import { useGetIdoUserDataByIdV2, useImmediateFetchPoolsUserDataV2 } from "../../../state/idoV2/hooks";
import { useRefund } from "../hooks/useRefund";
import { useClaim } from "../hooks/useClaim";
import { useTokenBalanceOfIdoContractV2 } from "../../../hooks/useTokenBalance";
import BigNumber from "bignumber.js";
import axios from "axios";
import * as ethers from "ethers";
import { Buffer } from "buffer";
import Circular from "../../components/Circular";

interface props {
  detail: IdoConfigV2
}

const ParticipateV2: React.FC<props> = ({ detail }) => {
  const isTestPool = detail.poolId === 137
  const { onAllowanceSupportCommToken, onApproveSupportCommToken } = useApproveTokenToFactoryV2(isTestPool)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { account } = useWeb3React()
  const curTime = new Date().getTime()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const [approvingFlag, setApprovingFlag] = useState(false)
  const refreshImmediately = useImmediateFetchPoolsUserDataV2()

  const addWhiteListByApi = async () => {
    try {
      await axios.post('https://farmer.trustfi.org/api/addIdoWhiteList', {
        message: account,
        sig: ethers.utils.keccak256('0x' + Buffer.from(`tfi-ido_${account}_tfi-ido`, 'utf-8').toString('hex')),
      });
    } catch (e) {
      // do nothing
    }
  }

  // input change value
  const [val, setVal] = useState('')
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const [supportCommTokenApproval, setSupportCommTokenApproval] = useState(false)
  // approve supportCommToken
  const handleApprove = useCallback(async () => {
    if (requestedApproval) return
    try {
      if (isTestPool && Number(val) !== 1500) {
        enqueueSnackbar('You can only fill in 1500 here', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 2500,
          TransitionComponent: Collapse,
        });
        throw new Error('notEnough')
      }
      setRequestedApproval(true)
      const [res] = await Promise.all([
        onApproveSupportCommToken(detail.supportCommToken),
        isTestPool ? addWhiteListByApi() : Promise.resolve(),
      ]);
      if (res) {
        setSupportCommTokenApproval(true)
        setApprovingFlag(true)
        enqueueSnackbar('Approve Successfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 2500,
          TransitionComponent: Collapse,
        });
        refreshImmediately()
      }

      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
      setRequestedApproval(false)
    }
  }, [onApproveSupportCommToken, detail, requestedApproval, val])

  // checked supportCommToken Approve
  useEffect(() => {
    if (account && detail && detail.supportCommToken) {
      onAllowanceSupportCommToken(detail.supportCommToken).then((res) => {
        setSupportCommTokenApproval(res)
      })
    }
  }, [
    setSupportCommTokenApproval, onAllowanceSupportCommToken,
    detail, requestedApproval, account
  ])

  // input solana address
  const [claimWalletAddress, setClaimWalletAddress] = useState('')
  const handleClaimWalletAddress = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setClaimWalletAddress(e.currentTarget.value)
    },
    [setClaimWalletAddress],
  )
  useEffect(() => {
    if (detail.isBSC) {
      setClaimWalletAddress(account)
    }
  }, [setClaimWalletAddress, detail, account])

  // get user data
  const userData = useGetIdoUserDataByIdV2(detail?.poolId)

  useEffect(() => {
    if (userData?.whiteListAmount) {
      setApprovingFlag(false)
    }
  }, [userData]);

  // stake action
  const { onStake } = useStakeV2(detail.poolId)
  const [pendingTx, setPendingTx] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const handleStake = useCallback(async () => {
    if (val === '') {
      // Over the limit
      enqueueSnackbar('Please enter number', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      return
    }
    if (isTestPool && Number(val) !== 1500) {
      // Over the limit
      enqueueSnackbar('You can only fill in 1500 here', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      return
    }
    if (isTestPool && Number(val) > Number(userData.supportCommTokenBalance)) {
      enqueueSnackbar('Over your balance', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      return
    }
    if (Number(val) > userData.canAmounts) {
      // Over the limit
      enqueueSnackbar('Over the limit', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      return
    }
    if (detail.distribution.toLowerCase() === 'airdrop' && claimWalletAddress === '') {
      // Over the limit
      enqueueSnackbar(`Please enter the ${detail.distributedName} address`, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      return
    }
    if (pendingTx || userData.canAmounts === 0) return
    try {
      setPendingTx(true)
      const res = await onStake(val, claimWalletAddress)
      if (res) {
        enqueueSnackbar('Commit Funds Successfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 2500,
          TransitionComponent: Collapse,
        });
      }
      setPendingTx(false)
    } catch (e) {
      console.error(e)
      setPendingTx(false)
    }
  }, [onStake, detail, pendingTx, val, claimWalletAddress])

  // refund  action
  const { onRefund } = useRefund(detail.poolId)
  const handleRefund = useCallback(async () => {
    if (pendingTx) return
    try {
      setPendingTx(true)
      const res = await onRefund()
      if (res) {
        enqueueSnackbar('Refund Successfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 2500,
          TransitionComponent: Collapse,
        });
      }
      setPendingTx(false)
    } catch (e) {
      console.error(e)
      setPendingTx(false)
    }
  }, [onRefund, pendingTx])
  // claim  action
  const { onClaim } = useClaim(detail.poolId)
  const { balance: idoTokenBalance } = useTokenBalanceOfIdoContractV2(detail.idoToken)
  const handleClaim = useCallback(async () => {
    if (pendingTx || userData.claimAmount > 0) return
    if (idoTokenBalance.div(new BigNumber(10).pow(detail.idoTokenDecimals)).lt(new BigNumber(userData.stakeAmount * detail.claimRatio))) {
      enqueueSnackbar('Please contact the administrator, IDO token balance not enough', {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      return
    }
    console.log('ido1', idoTokenBalance.div(new BigNumber(10).pow(detail.idoTokenDecimals)).toNumber())
    console.log('ido2', new BigNumber(userData.stakeAmount * detail.claimRatio).toNumber())
    try {
      setPendingTx(true)
      const res = await onClaim()
      if (res) {
        enqueueSnackbar('Claim Successfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 2500,
          TransitionComponent: Collapse,
        });
      }
      setPendingTx(false)
    } catch (e) {
      console.error(e)
      setPendingTx(false)
    }
  }, [onClaim, pendingTx, userData])

  // btn view
  const renderBtn = () => {
    //  claim is start , Commit close
    if (detail.distribution.toLowerCase() !== 'airdrop' && curTime <= detail.claimEndTime && curTime >= detail.claimStartTime) {
      return null
    }

    if (curTime > detail.endTime) {
      // Closed
      return (
        <div className="approve-btn acea-row row-center-wrapper bt disable">Closed</div>
      )
    }
    if (curTime < detail.startTime) {
      // Not started
      return (
        <div className="approve-btn acea-row row-center-wrapper bt disable">Not Started</div>
      )
    }

    if (isTestPool) {
      if (approvingFlag) {
        return (
          <div
            className={`approve-btn acea-row row-center-wrapper bt disable`}>
            {pendingTx ? 'Pending...' : 'Commit Funds'}
          </div>
        )
      }
      return (supportCommTokenApproval && userData.whiteListAmount) ? (
        <div
          className={`approve-btn acea-row row-center-wrapper bt ${(pendingTx || userData.canAmounts === 0) ? 'disable' : ''}`}
          onClick={handleStake}>
          {pendingTx ? 'Pending...' : 'Commit Funds'}
        </div>
      ) : (
        <div className={`approve-btn acea-row row-center-wrapper bt ${requestedApproval ? 'disable' : ''}`}
             onClick={handleApprove}>Approve</div>
      )
    }

    if (userData.whiteListAmount) {
      return (supportCommTokenApproval) ? (
        <div
          className={`approve-btn acea-row row-center-wrapper bt ${(pendingTx || userData.canAmounts === 0) ? 'disable' : ''}`}
          onClick={handleStake}>
          {pendingTx ? 'Pending...' : 'Commit Funds'}
        </div>
      ) : (
        <div className={`approve-btn acea-row row-center-wrapper bt ${requestedApproval ? 'disable' : ''}`}
             onClick={handleApprove}>Approve</div>
      )
    }

    return (
      <div className="approve-btn acea-row row-center-wrapper bt disable">
        You are not whitelisted
      </div>
    )
  }
  // show refund button
  const renderRefundBtn = () => {
    // distribution is airdrop ,don't show refund button
    if (detail.distribution.toLowerCase() === 'airdrop') return null
    // over the claimEndTime or over the 24 hours after claimStartTime  , can't refund
    //  24 * 60 * 60 * 1000 =
    if (curTime < detail.claimStartTime || curTime > (detail.claimStartTime + 24 * 60 * 60 * 1000)) {
      return null
    }
    if (userData.stakeAmount > 0 && userData.claimAmount <= 0) {
      return (
        <div className={`approve-btn acea-row row-center-wrapper bt ${pendingTx ? 'disable' : ''}`}
             onClick={handleRefund}>
          {pendingTx ? 'Pending...' : 'Refund'}
        </div>
      )
    }
    return null
  }
  // show claim button
  const renderClaimBtn = () => {
    // no bsc or distribution is airdrop ,don't show claim button
    if (detail.distribution.toLowerCase() === 'airdrop' || !detail.isBSC) return null
    // over the time
    if (curTime < detail.claimStartTime || curTime > detail.claimEndTime) return null
    // user not Commit funds
    if (userData.stakeAmount <= 0) return null

    return (
      <div
        className={`approve-btn acea-row row-center-wrapper bt ${pendingTx || userData.claimAmount > 0 ? 'disable' : ''}`}
        onClick={handleClaim}>
        {pendingTx ? 'Pending...' : (userData.claimAmount > 0 ? 'Claimed' : 'Claim')}
      </div>
    )
  }


  // LanunchTime over 3days
  const swapFinish = isTestPool ? false : curTime > (detail.launchTime + 7 * 24 * 60 * 60 * 1000)
  let ratioVal: string;
  if (swapFinish) {
    ratioVal = '100';
  } else {
    if (detail.startAmountOfThisPool && detail.totalAmountOfThisPool) {
      ratioVal = ((detail.startAmountOfThisPool + detail.amount) / detail.totalAmountOfThisPool * 100).toFixed(1)
    } else {
      ratioVal = (detail.amount / detail.poolMaxAmount * 100).toFixed(1)
    }
  }

  return (
    <div className="acea-row row-between">
      <div className="participate-wrap">
        <div className="acea-row row-between participate-wrap-acea-row">
          <div className="participate-deal flex1">
            <div className="pd-title">Participate Deal</div>
            <div className="acea-row acea-row-margin">
              <div className="ido-chain-info">
                <div className="label">IDO On</div>
                <img className="logo" src={detail.idoOnChainLogo}/>
              </div>
              <div className="ido-chain-info">
                <div className="label">Distributed on</div>
                <img className="logo" src={detail.distributedLogo}/>
              </div>
            </div>
            <div className="acea-row acea-row-margin">
              <div className="input-title">
                Commit your funds
              </div>
              <div style={{ flex: 3 }}>
                <div className="input-wrap">
                  <input
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    inputMode="decimal"
                    step="any"
                    onChange={handleChange}
                    placeholder={curTime > detail.endTime ? 'Commit Closed' : '0'}
                    value={val}
                  />
                </div>
              </div>
            </div>
            {!detail.isBSC && detail.distribution.toLowerCase() === 'airdrop' && (
              <div className="acea-row acea-row-margin">
                <div className="input-title">{detail.distributedName} Address</div>
                <div style={{ flex: 3 }}>
                  <div className="input-wrap">
                    <input
                      onChange={handleClaimWalletAddress}
                      value={claimWalletAddress}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="acea-row acea-row-margin">
              <div className="input-title">
                {detail.configClaimUrl && (
                  <div className="approve-btn acea-row row-center-wrapper bt" style={{ backgroundColor: '#FEE108' }}
                       onClick={() => {
                         window.open(detail.configClaimUrl)
                       }}>Claim</div>
                )}
              </div>
              <div style={{ flex: 3 }}>
                {account && !userData && <Circular/>}
                {account && userData && renderBtn()}
                {!account && (
                  <div className="approve-btn acea-row row-center-wrapper bt"
                       onClick={onPresentConnectModal}>Connect</div>
                )}
                {account && userData && renderRefundBtn()}
                {account && userData && renderClaimBtn()}
              </div>
            </div>

          </div>
          <div className="participate-details flex1">
            <div className="pd-title">Participate Details</div>
            <div className="pd-row acea-row row-between">
              <div>Your Balance</div>
              <div>{userData ? userData.supportCommTokenBalance : 0} USDT</div>
            </div>
            {!isTestPool && <div className="pd-row acea-row row-between">
              <div>Max Allocation</div>
              <div>{userData ? userData.canAmounts : 0} USDT</div>
            </div>}
            {isTestPool && <div className="pd-row acea-row row-between">
              <div>Token Price</div>
              <div>1500 USDT</div>
            </div>}
            <div className="pd-row acea-row row-between">
              <div>Your {isTestPool ? 'NFT' : 'token'} to be claimed:</div>
              <div>{userData ? (userData.stakeAmount * detail.claimRatio).toFixed(3) : 0} {detail.idoTokenSymbol}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="swap-wrap">
        <div className="swap-title">{swapFinish ? 'Finished' : 'Swap Ratio'}</div>
        <div>
          <div className="acea-row row-between">
            <div>Swap progress</div>
            <div>{ratioVal}%</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="progress-warp">
              <div className="progress-line" style={{ width: `${ratioVal === 'NaN' ? 0 : ratioVal}%` }}/>
            </div>
          </div>

          {!swapFinish && (
            <div className="acea-row row-between">
              <div>%0</div>
              <div>%100</div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
export default ParticipateV2
