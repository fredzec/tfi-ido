import React, {useCallback, useEffect, useState} from "react";
import {IdoConfig} from "../../../state/types";
import {useApproveTokenToFactory} from "../hooks/useApprove";
import {useGetIdoUserDataById} from "../../../state/ido/hooks";
import {useWeb3React} from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";
import {useWalletModal} from "@vipswap/uikit";
import useStake from "../hooks/useStake";
import {useSnackbar} from "notistack";
import {Collapse} from "@material-ui/core";

interface props {
  detail: IdoConfig
}
const Participate:React.FC<props> = ({detail})=>{
  const {onAllowanceSupportCommToken,onApproveSupportCommToken} = useApproveTokenToFactory()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const {account} = useWeb3React()
  const curTime = new Date().getTime()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  const [supportCommTokenApproval,setSupportCommTokenApproval]= useState(false)
  // approve supportCommToken
  const handleApprove = useCallback(async () => {
    if(requestedApproval) return
    try {
      setRequestedApproval(true)
      const res  = await onApproveSupportCommToken(detail.supportCommToken)
      if(res){
        setSupportCommTokenApproval(true)
      }
      enqueueSnackbar(res?'Approve Successfully':'Approve Error', {
        variant: res?'success':'error' ,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
      setRequestedApproval(false)
    }
  }, [onApproveSupportCommToken,detail,requestedApproval])

  // checked supportCommToken Approve
  useEffect(()=>{
    if(account && detail && detail.supportCommToken){
      onAllowanceSupportCommToken(detail.supportCommToken).then((res)=>{
        setSupportCommTokenApproval(res)
      })
    }
  },[
    setSupportCommTokenApproval,onAllowanceSupportCommToken,
    detail,requestedApproval,account
  ])

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

  // get user data
  const userData = useGetIdoUserDataById(detail?.poolId)

  // stake action
  const {onStake} = useStake(detail.poolId)
  const [pendingTx, setPendingTx] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const handleStake = useCallback(async () => {

    if(val===''){
      // Over the limit
      enqueueSnackbar('Please enter number', {
        variant:'error' ,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      return
    }
    if(Number(val)>userData.canAmounts ){
      // Over the limit
      enqueueSnackbar('Over the limit', {
        variant:'error' ,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 2500,
        TransitionComponent: Collapse,
      });
      return
    }
    if(pendingTx||userData.canAmounts===0 || userData.stakeAmount!==0) return
    try {
      setPendingTx(true)
      const res = await onStake(val)
      if(res){
        enqueueSnackbar('Commit Funds Successfully', {
          variant:'success' ,
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
  }, [onStake,detail, pendingTx,val])

  // btn view
  const renderBtn = ()=>{
    if(curTime > detail.endTime){
      // Closed
      return (
          <div className="approve-btn acea-row row-center-wrapper bt disable">Closed</div>
      )
    }
    if(curTime<detail.startTime){
      // Not started
      return (
        <div className="approve-btn acea-row row-center-wrapper bt disable">Not Started</div>
      )
    }

    if(userData.poolWhiteList) {
      return supportCommTokenApproval?(
        <div className={`approve-btn acea-row row-center-wrapper bt ${(pendingTx||userData.canAmounts===0||userData.stakeAmount!==0)?'disable':''}`} onClick={handleStake}>
          {pendingTx?'Pending...':'Commit Funds'}
        </div>
      ):(
        <div className={`approve-btn acea-row row-center-wrapper bt ${requestedApproval?'disable':''}`} onClick={handleApprove} >Approve</div>
      )
    }
    return (
      <div className="approve-btn acea-row row-center-wrapper bt disable">
        You are not whitelisted
      </div>
    )
  }

  // LanunchTime over 3days
  const swapFinish = curTime > (detail.launchTime + 3* 24*60*60*1000)
  const ratioVal =swapFinish?100:  (detail.amount / detail.poolMaxAmount * 100).toFixed(1)

  return (
    <div className="acea-row row-between">
      <div className="participate-wrap">
        <div className="acea-row row-between participate-wrap-acea-row">
          <div className="participate-deal flex1">
            <div className="pd-title">Participate Deal</div>
            <div className="acea-row ">
              <div className="input-title">Commit your funds</div>
              <div style={{flex: 1}}>
                <div className="input-wrap" style={{marginBottom: '10px'}}>
                  <input
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    inputMode="decimal"
                    step="any"
                    onChange={handleChange}
                    placeholder="0"
                    value={val}
                  />
                </div>
                {account && userData && renderBtn()}
                {!account && (
                  <div className="approve-btn acea-row row-center-wrapper bt" onClick={onPresentConnectModal}>Connect</div>
                )}
                {/*
                {supportCommTokenApproval?(
                  <div className="approve-btn acea-row row-center-wrapper bt">Stake</div>
                ):(
                  <div className={`approve-btn acea-row row-center-wrapper bt ${requestedApproval?'disable':''}`} onClick={handleApprove} >Approve</div>
                )}
                */}

              </div>
            </div>
          </div>
          <div className="participate-details flex1">
            <div className="pd-title">Participate Details</div>
            <div className="pd-row acea-row row-between">
              <div>Your Balance</div>
              <div>{userData?userData.supportCommTokenBalance:0} BUSD</div>
            </div>
            <div className="pd-row acea-row row-between">
              <div>Max Allocation</div>
              <div>{userData?userData.canAmounts:0} BUSD</div>
            </div>
            <div className="pd-row acea-row row-between">
              <div>Your token to be claimed:</div>
              <div>{userData?(userData.stakeAmount * detail.claimRatio).toFixed(3):0} {detail.idoTokenSymbol}</div>
            </div>
            {/*
            <div className="pd-row acea-row row-between">
              <div>Your funds to be received:</div>
              <div>0 BUSD</div>
            </div>
            */}

          </div>
        </div>
        {/*
        <div className="tips">You're allowed to initiate refund applications, after the tokens listed on CEX or DEX within 24 hours after TGE, if you have't claimed tokens on CheersLand.</div>
        */}
      </div>
      <div className="swap-wrap">
        <div className="swap-title">{swapFinish?'Finished':'Swap Ratio'}</div>
        <div>
          <div className="acea-row row-between">
            <div>Swap progress</div>
            <div>{ratioVal}%</div>
          </div>
          <div style={{position: 'relative'}}>
            <div className="progress-warp">
              <div className="progress-line" style={{width: `${ratioVal==='NaN'?0:ratioVal}%`}} />
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
export default Participate
