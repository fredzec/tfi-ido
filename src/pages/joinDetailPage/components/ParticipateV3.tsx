import React, { useCallback, useEffect, useState } from "react"
import { IdoConfigV2 } from "../../../state/types"
import { useApproveTokenToFactoryV2 } from "../hooks/useApprove"
import { useWeb3React } from "@web3-react/core"
import useAuth from "../../../hooks/useAuth"
import { useWalletModal } from "trustfi-uikit"
import { useStakeV2 } from "../hooks/useStake"
import { useSnackbar } from "notistack"
import { Collapse } from "@material-ui/core"
import Circular from "../../components/Circular"
import moment from "moment/moment"
import { useGetIdoUserDataByIdV3, useImmediateFetchPoolsUserDataV3 } from "../../../state/idoV3/hooks"

interface props {
  detail: IdoConfigV2
}

const ParticipateV3: React.FC<props> = ({ detail }) => {
  const isTestPool = detail.poolId === 137
  const { onAllowanceSupportCommToken, onApproveSupportCommToken } = useApproveTokenToFactoryV2(isTestPool)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { account } = useWeb3React()
  const curTime = new Date().getTime()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const [approvingFlag, setApprovingFlag] = useState(false)
  const refreshImmediately = useImmediateFetchPoolsUserDataV3()
  const userData = useGetIdoUserDataByIdV3(detail?.poolId)

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
      setRequestedApproval(true)
      const [res] = await Promise.all([
        onApproveSupportCommToken(detail.supportCommToken),
      ])
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
        })
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

  // stake action
  const { onStake } = useStakeV2(detail.poolId)
  const [pendingTx, setPendingTx] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
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
      })
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
      })
      return
    }
    if (pendingTx) return
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
        })
      }
      setPendingTx(false)
    } catch (e) {
      console.error(e)
      setPendingTx(false)
    }
  }, [onStake, detail, pendingTx, val, claimWalletAddress])

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

    return (
      <div
        className={`approve-btn acea-row row-center-wrapper bt ${(pendingTx) ? 'disable' : ''}`}
        onClick={handleStake}>
        {pendingTx ? 'Pending...' : 'Commit Funds'}
      </div>
    )
  }

  // LanunchTime over 3days
  let swapFinish = false
  if (isTestPool) {
    swapFinish = false
  } else if (curTime > (detail.launchTime + 7 * 24 * 60 * 60 * 1000)) {
    // 开始超过7天展示全部完成
    swapFinish = true
  } else {
    // 结束超过3天展示全部完成
    const endTimeTs = detail.endTimeForShow ? moment(detail.endTimeForShow.replace('UTC', '+0000'), 'hA MM/DD/YYYY Z').valueOf() : detail.endTime
    if (Date.now() > (endTimeTs + 3 * 24 * 60 * 60 * 1000)) {
      swapFinish = true
    }
  }
  let ratioVal: string
  if (swapFinish) {
    ratioVal = '100'
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
            <div className="acea-row acea-row-margin">
              <div className="input-title">
              </div>
              <div style={{ flex: 3 }}>
                {account && !userData && <Circular/>}
                {account && userData && renderBtn()}
                {!account && (
                  <div className="approve-btn acea-row row-center-wrapper bt"
                       onClick={onPresentConnectModal}>Connect</div>
                )}
              </div>
            </div>
          </div>
          <div className="participate-details flex1">
            <div className="pd-title">Participate Details</div>
            <div className="pd-row acea-row row-between">
              <div>Your Balance</div>
              <div>{userData?.supportCommTokenBalance ?? 0} USDT</div>
            </div>
            <div className="pd-row acea-row row-between">
              <div>Max Allocation</div>
              <div>Infinite</div>
            </div>
            <div className="pd-row acea-row row-between">
              <div>Your {isTestPool ? 'NFT' : 'token'} to be claimed:</div>
              {/*<div>{userData?.canClaimAmount ?? 0} {detail.idoTokenSymbol}</div>*/}
              <div>TBA</div>
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
export default ParticipateV3
