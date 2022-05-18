import React, {Fragment} from "react";
import { Link } from 'react-router-dom';
import {IdoConfig, IdoConfigV2} from "../../../state/types";
import './projectCard.scss'
import moment from "moment";

interface props {
  pool: IdoConfig | IdoConfigV2,
  viewKey: 'upcoming'| 'closed',
  version: 'v1'| 'v2',
}
const ProjectCard:React.FC<props> = ({pool,viewKey,version})=>{

  const salePrice = Math.round(1 / pool.idoTokenPrice * 100) / 100
  return (
    <div className="projects-item">
      <div className="pi-title acea-row row-middle">
        <div className="pi-avatar">
          {pool.avatar && (<img src={pool.avatar}/>)}
        </div>
        <div>
          <div className="pi-user-name">{pool.name || '???'}</div>
          <div className="pi-user-sub">{pool.subName || '???'}</div>
        </div>
        {pool.tag ? <div className="tag">{pool.tag}</div> : null}
      </div>
      <div className="pi-content">
        <div className="pi-row">
          <div className="pi-row-left">Sale Price:</div>
          <div className="pi-row-right">{`1 BUSD = ${salePrice} ${pool.idoTokenSymbol}`}</div>
        </div>
        <div className="pi-row">
          <div className="pi-row-left">IDO Starts:</div>
          <div className="pi-row-right">
            {moment(pool.startTime).utc().format('L LT UTC')}
          </div>
        </div>
        <div className="pi-row">
          <div className="pi-row-left">IDO Ends:</div>
          <div className="pi-row-right">
            {moment(pool.endTime).utc().format('L LT UTC')}
          </div>
        </div>
        {/*
        <div className="pi-row">
          <div className="pi-row-left">Claim Starts:</div>
          <div className="pi-row-right">
            {pool.claimStarts===0?'TBA':moment(pool.claimStarts).utc().format('L LT UTC')}
          </div>
        </div>
        */}
        <div className="acea-row row-between">
          <Fragment>
            {/*
            <Link to={`/${pool.nameKey}/detail`} className="pi-btn bt">Details</Link>
            */}
            {viewKey  === 'closed' ? (
              <div className="pi-btn bt disable">Join Deals</div>
            ):(
              <Link to={`/${version}/${pool.nameKey}/join`} className="pi-btn bt">Join Deals</Link>
            )}
          </Fragment>
        </div>
      </div>

    </div>
  )
}

export default ProjectCard
