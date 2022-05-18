import React from "react";
import { Link } from 'react-router-dom';
import {IdoConfig} from "../../../state/types";
import {getChainInfo} from "../../../utils/getChainInfo";
import moment from "moment";

interface props {
  detail: IdoConfig
}
const ProInfo:React.FC<props> = ({detail})=>{
  const chainInfo = getChainInfo(detail?.chainId)
  return detail ? (
    <div style={{padding: '0 50px'}}>
      <div className="acea-row row-between row-middle">
        <div className="acea-row row-middle">
          <div className="avatar-wrap acea-row row-center-wrapper">
            <img src={detail.avatar}/>
          </div>
          <div >
            <div className="project-title">{detail.name}</div>
            <div className="project-subtitle">${detail.idoTokenSymbol}</div>
          </div>
        </div>
        <Link to={`/${detail.nameKey}/join`} className="join-detail-btn bt acea-row row-center-wrapper">Join Deal</Link>
      </div>
      <div className="deal-details">
        Deal Details
      </div>
      <div className="detail-text">
        <p>
          Virtual interaction with other users using a hero NFT Avatar
          Build shops, party halls, offices, meeting halls and organize social gatherings
          Build different Games on the LandsVirtual interaction with other users using a hero NFT Avatar
          Build shops, party halls, offices, meeting halls and organize social gatherings
          Build different Games on the Lands
        </p>
        <p>
          Virtual interaction with other users using a hero NFT Avatar
          Build shops, party halls, offices, meeting halls and organize social gatherings
          Build different Games on the Lands
          Virtual interaction with other users using a hero NFT Avatar.
        </p>
      </div>
      <div className="acea-row">
        <div className="detail-item acea-row row-between">
          <div>Network</div>
          <div className="acea-row row-middle">
            <img src={chainInfo.icon}/>
            <div>{chainInfo.name}</div>
          </div>
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
      <div className="acea-row" style={{marginTop: '30px'}}>
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
    </div>
  ): null
}
export default ProInfo
