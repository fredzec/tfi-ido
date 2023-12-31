import React from "react";
import {IdoConfig, IdoConfigV2} from "../../../state/types";
import moment from "moment";
import {getChainInfo} from "../../../utils/getChainInfo";

interface props {
  detail: IdoConfigV2
}
const TokenInformationV2:React.FC<props> = ({detail})=>{
  const chainInfo = getChainInfo(detail?detail.chainId:56)

  const isTestPool = detail.poolId === 137;

  return (
    <div className="token-deal-info">
      <div className="pd-title">{isTestPool ? 'NFT' : 'Token'} & Deal Information</div>
      <div>
        <div className="acea-row token-acea-row">
          <div className="detail-item acea-row row-between">
            <div>Network</div>
            <div>{detail.distributedName}</div>

          </div>
          <div className="detail-item acea-row row-between">
            <div>Type</div>
            <div>{isTestPool ? 'NFT SALE' : detail.type}</div>
          </div>
          <div className="detail-item acea-row row-between">
            <div>{isTestPool ? 'NFT' : 'Token'} Price</div>
            <div>${detail.idoTokenPrice}</div>
          </div>
        </div>
        <div className="acea-row  token-acea-row">
          <div className="detail-item acea-row row-between">
            <div>Launch Date</div>
            <div>{detail.startTimeForShow || moment(detail.launchTime).utc().format('L UTC')}</div>
          </div>
          <div className="detail-item acea-row row-between">
            <div>End Date</div>
            <div>{detail.endTimeForShow || moment(detail.endTime).utc().format('L UTC')}</div>
          </div>
          <div className="detail-item acea-row row-between">
            <div>{isTestPool ? 'NFT' : 'Token'} Distribution</div>
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
            <div>{isTestPool ? 'The Chosen One' : detail.idoTokenSymbol}</div>
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
