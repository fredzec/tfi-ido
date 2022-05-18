import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import React, { useCallback, useMemo, useState } from 'react'
import {Button, Modal, LinkExternal, Input} from '@vipswap/uikit'
import {IdoConfigV2} from "../../../state/types";
import {useClaimOtherChain} from "../hooks/useClaim";
import {useSnackbar} from "notistack";
import {Collapse} from "@material-ui/core";

interface ModalProps {
  detail: IdoConfigV2,
  onDismiss?: () => void
}

const ClaimModal: React.FC<ModalProps> = ({ detail,onDismiss }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
  }
  const {onClaimOtherChain} = useClaimOtherChain(detail.poolId)
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Modal title={`Enter the wallet address`} onDismiss={onDismiss} style={{maxWidth: '600px'}}>
      <StyledInput
        value={val}
        onChange={onChange}
        placeholder="Please enter the wallet address"
      />
      <StyledTip>
        Please enter the wallet address of the receipt, you can only fill in once, please ensure that the input is correct
      </StyledTip>
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} disabled={pendingTx}>
          Cancel
        </Button>
        <StyledBtn
          width="100%"
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            const res = await onClaimOtherChain(val)
            setPendingTx(false)
            if(res){
              enqueueSnackbar('Claim Successfully', {
                variant:'success' ,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                autoHideDuration: 2500,
                TransitionComponent: Collapse,
              });
              onDismiss()
            }else{
              enqueueSnackbar('Has Error, Please try it again', {
                variant:'error' ,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                autoHideDuration: 2500,
                TransitionComponent: Collapse,
              });
            }
          }}
        >
          {pendingTx ? 'Pending...' : 'Confirm'}
        </StyledBtn>
      </ModalActions>
    </Modal>
  )
}

const StyledTip = styled.div`
  font-size: 16px;
  color: #fff;
  line-height: 1.4;
  padding: 10px;
`
const StyledBtn = styled(Button)`
  color: #000;
  background-color: #FEE108;
`
const StyledInput = styled(Input)`
  border-radius: 10px;
  border: 2px solid #FEE108;
  background-color: #020202;
  height: 32px; 
  width: auto;
  color: #FEE108;
  margin: 0 10px;
  &::placeholder {
    color: #6D6D6D;
  }

  &:disabled {
    background-color: #020202;
    box-shadow: none;
    color: #6d6d6d;
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    box-shadow: none;
  }
  
`
const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & button {
    flex: 1;
    margin: 0 10px;
  }
`
export default ClaimModal
