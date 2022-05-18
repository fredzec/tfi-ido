import React from "react";
import {IdoConfig} from "../../../state/types";
import {getChainInfo} from "../../../utils/getChainInfo";
import moment from "moment";

interface props {
  detail: IdoConfig
}
const TokenInfomation:React.FC<props> = ({detail})=>{
  const chainInfo = getChainInfo(detail?.chainId)
  return detail ? (
    <div className="token-info-wrap">
      <div className="ct-title">Token Information</div>
      <div className="acea-row" style={{marginTop: '42px'}}>
        <div className="detail-item acea-row row-between">
          <div>Name</div>
          <div>{detail.name}</div>
        </div>
        <div className="detail-item acea-row row-between">
          <div>Token</div>
          <div>{detail.idoTokenSymbol}</div>
        </div>
        <div className="detail-item acea-row row-between">
          <div>Token Price</div>
          <div>${detail.idoTokenPrice}</div>
        </div>
      </div>
      <div className="acea-row" style={{marginTop: '30px'}}>
        <div className="detail-item acea-row row-between">
          <div>Vesting</div>
          <div></div>
        </div>
        <div className="detail-item acea-row row-between">
          <div>Network</div>
          <div className="acea-row row-middle">
            <img src={chainInfo.icon}/>
            <div>{chainInfo.name}</div>
          </div>
        </div>
        <div className="detail-item acea-row row-between" style={{opacity: 0}}>

        </div>
      </div>
    </div>
  ): null
}
export default TokenInfomation
