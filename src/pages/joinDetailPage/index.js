import React, { Component } from 'react'
import MineHeader from '../../components/mine-header/index.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import avatar2 from '../../common/images/avatar2.png'
import bnb from '../../common/images/bnb.png'
import './joinDetailPage.scss'
class JoinDetailPage extends Component {
	componentDidMount() { // 生命周期 类似mounted
		window.scrollTo (0,0);
	}
	render() {
		return (
			<div className="join-detail-page">
				<MineHeader/>
				<div className="main-content">
					<div className="main-row" style={{position: 'relative'}}>
						<div className="tag">MAIN IGO</div>
						<div className="acea-row row-middle">
							<div className="avatar">
								<img src={avatar2}/>
							</div>
							<div>
								<div className="project-title">Battle Saga</div>
								<div className="project-subtitle">$BTLS</div>
							</div>
						</div>
						<div className="project-desc-text">CheersLand is a scalable GameFi Metaverse Aggregator where anyone can monetize their gaming experiences and social networks. CheersLand runs the GameFi-as-a-Service model, dual-driven in Play to Earn and Build to Earn, with the product portfolio of Gamified Launchpad, Multi-game Universe, Multi-asset Staking Platform and NFT Market, and powered developing new users by the invitation mechanism, which builds a unique and diversified GameFi ecosystem.</div>
						<div className="acea-row row-between">
							<div className="participate-wrap">
								<div className="acea-row row-between">
									<div className="participate-deal flex1">
										<div className="pd-title">Participate Deal</div>
										<div className="acea-row">
											<div className="input-title">Commit your funds</div>
											<div style={{flex: 1}}>
												<div className="input-wrap">
													<input/>
												</div>
												<div className="approve-btn acea-row row-center-wrapper bt">Approve</div>
											</div>
										</div>
									</div>
									<div className="participate-details flex1">
										<div className="pd-title">Participate Details</div>
										<div className="pd-row acea-row row-between">
											<div>Balance</div>
											<div>0 USDT</div>
										</div>
										<div className="pd-row acea-row row-between">
											<div>Allocation</div>
											<div>0/0 USDT</div>
										</div>
										<div className="pd-row acea-row row-between">
											<div>Your token to be claimed:</div>
											<div>0 USDT</div>
										</div>
										<div className="pd-row acea-row row-between">
											<div>Your funds to be received:</div>
											<div>0 USDT</div>
										</div>
									</div>
								</div>
								<div className="tips">You're allowed to initiate refund applications, after the tokens listed on CEX or DEX within 24 hours after TGE, if you have't claimed tokens on CheersLand.</div>
							</div>
							<div className="swap-wrap">
								<div className="swap-title">Swap Ratio</div>
								<div>
									<div>Swap progress</div>
									<div style={{position: 'relative'}}>
										<div className="progress-warp">

										</div>
										<div className="progress-line"></div>
									</div>

									<div className="acea-row row-between">
										<div>%0</div>
										<div>%100</div>
									</div>
								</div>
							</div>
						</div>
						<div className="token-deal-info">
							<div className="pd-title">Token & Deal Information</div>
							<div>
								<div className="acea-row">
									<div className="detail-item acea-row row-between">
										<div>Network</div>
										<div className="acea-row row-middle">
											<img src={bnb}/>
											<div>BSC</div>
										</div>
									</div>
									<div className="detail-item acea-row row-between">
										<div>Type</div>
										<div>IGO</div>
									</div>
									<div className="detail-item acea-row row-between">
										<div>Token Price</div>
										<div>$0.05</div>
									</div>
								</div>
								<div className="acea-row" style={{marginTop: '30px'}}>
									<div className="detail-item acea-row row-between">
										<div>Launch Date</div>
										<div>17/12/2021</div>
									</div>
									<div className="detail-item acea-row row-between">
										<div>End Date</div>
										<div>17/12/2021</div>
									</div>
									<div className="detail-item acea-row row-between">
										<div>Token Distribution</div>
										<div>Claim</div>
									</div>
								</div>
								<div className="acea-row" style={{marginTop: '30px'}}>
									<div className="detail-item acea-row row-between">
										<div>Vesting</div>
										<div></div>
									</div>
									<div className="detail-item acea-row row-between">
										<div>Token</div>
										<div>BTLS</div>
									</div>
									<div className="detail-item acea-row row-between">
										<div>Name</div>
										<div>Battle Saga</div>
									</div>
								</div>
								<div className="tdi-tip">10% at TGE; 10% per month for 9 months.</div>
							</div>
						</div>
						<div className="about-wrap">
							<div className="pd-title">About the Project</div>
							<div style={{height: '200px'}}></div>
						</div>
					</div>
				</div>
				<HowToParticipate/>
				<MineFooter/>
			</div>
		)
	}
}
export default JoinDetailPage
