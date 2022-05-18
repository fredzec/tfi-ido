import React from "react";
import {IdoConfig, IdoConfigV2} from "../../../state/types";
import moment from "moment";
import {getChainInfo} from "../../../utils/getChainInfo";

interface props {
  detail: IdoConfigV2
}
const TokenInformationV2:React.FC<props> = ({detail})=>{
  const chainInfo = getChainInfo(detail?detail.chainId:56)

  return (
    <div className="token-deal-info">
      <div className="pd-title">Token & Deal Information</div>
      <div>
        <div className="acea-row token-acea-row">
          <div className="detail-item acea-row row-between">
            <div>Network</div>
            <div>{detail.distributedName}</div>

          </div>
          <div className="detail-item acea-row row-between">
            <div>Type</div>
            <div>{detail.type}</div>
          </div>
          <div className="detail-item acea-row row-between">
            <div>Token Price</div>
            <div>${detail.idoTokenPrice}</div>
          </div>
        </div>
        <div className="acea-row  token-acea-row">
          <div className="detail-item acea-row row-between">
            <div>Launch Date</div>
            <div>{moment(detail.launchTime).utc().format('L UTC')}</div>
          </div>
          <div className="detail-item acea-row row-between">
            <div>End Date</div>
            <div>{moment(detail.endTime).utc().format('L UTC')}</div>
          </div>
          <div className="detail-item acea-row row-between">
            <div>Token Distribution</div>
            <div>{detail.distribution}</div>
          </div>
        </div>
        <div className="acea-row token-acea-row">
          <div className="detail-item acea-row row-between">
            <div>Vesting</div>
            <div></div>
          </div>
          <div className="detail-item acea-row row-between">
            <div>Token</div>
            <div>{detail.idoTokenSymbol}</div>
          </div>
          <div className="detail-item acea-row row-between">
            <div>Name</div>
            <div>{detail.name}</div>
          </div>
        </div>
        <div className="tdi-tip">{detail.vesting}</div>
      </div>
    </div>
  )
}

export default TokenInformationV2
