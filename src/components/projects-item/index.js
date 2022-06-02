import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import bnb from '../../common/images/bnb.png'
import avatar1 from '../../common/images/avatar1.png'
// import './index.scss'

class ProjectsItem extends Component {
	constructor(props){
	  super(props);
	  this.state = {

	  }
	}
	componentDidMount() { // 生命周期 类似mounted
		// console.log(this.props.itemData);
		// console.log(this.props);
	}
    render() {
		const {} = this.state
		const {itemData,detailAble,joinAble} = this.props
        return (
            <div className="projects-item">
                <div className="pi-title acea-row row-middle">
					<div className="pi-avatar">
						{itemData.avatar ? <img src={itemData.avatar}/> : null}
					</div>
					<div>
						<div className="pi-user-name">{itemData.name || '???'}</div>
						<div className="pi-user-sub">{itemData.subName || '$???'}</div>
					</div>
					{itemData.tag ? <div className="tag">{itemData.tag}</div> : null}
				</div>
				<div className="pi-content">
				{
					// <>
						// <div className="pi-row">
						// 	<div className="pi-row-left">Network</div>
						// 	<img src={bnb} className="bnb"/>
						// </div>
						// <div className="pi-row">
						// 	<div className="pi-row-left">Type</div>
						// 	<div className="pi-row-right">{itemData.type}</div>
						// </div>
						// <div className="pi-row">
						// 	<div className="pi-row-left">Launch Date</div>
						// 	<div className="pi-row-right">{itemData.launchDate}</div>
						// </div>
						// <div className="pi-row">
						// 	<div className="pi-row-left">End Date</div>
						// 	<div className="pi-row-right">{itemData.endDate}</div>
						// </div>
						// <div className="pi-row">
						// 	<div className="pi-row-left">Token Price</div>
						// 	<div className="pi-row-right">{itemData.tokenPrice}</div>
						// </div>
						// <div className="pi-row">
						// 	<div className="pi-row-left">Token Distribution</div>
						// 	<div className="pi-row-right">{itemData.tokenDistribution}</div>
						// </div>
						// <div className="pi-row">
						// 	<div className="pi-row-left">Project Website</div>
						// 	<div className="pi-row-right">{itemData.projectWebsite}</div>
						// </div>
					// </>
					<>
						<div className="pi-row">
							<div className="pi-row-left">Sale Price:</div>
							<div className="pi-row-right">{itemData.salePrice}</div>
						</div>
						<div className="pi-row">
							<div className="pi-row-left">IDO Starts:</div>
							<div className="pi-row-right">{itemData.IGOStarts}</div>
						</div>
						<div className="pi-row">
							<div className="pi-row-left">IDO Ends:</div>
							<div className="pi-row-right">{itemData.IGOEnds}</div>
						</div>
						{/*
						<div className="pi-row" style={{opacity: itemData.ClaimStarts ? 1 : 0}}>
							<div className="pi-row-left">Claim Starts:</div>
							<div className="pi-row-right">{itemData.ClaimStarts}</div>
						</div>
						*/}
					</>
				}
					<div className="acea-row row-between">
						{
							itemData.needApply?
							<div className="pi-apply-btn bt">Apply for Launchpad</div>:
							<Fragment>
								{/*
								{detailAble?(
									<Link to="/detail" className="pi-btn bt">Details</Link>
								):(
									<div className="pi-btn bt disable">Details</div>
								)}
								*/}
								{joinAble?(
									<Link to="/join" className="pi-btn bt">Join Deals</Link>
								):(
									<div className="pi-btn bt disable">Join Deals</div>
								)}
							</Fragment>
						}

					</div>
				</div>

            </div>
        )
    }
}

export default ProjectsItem
