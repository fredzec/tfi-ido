import React, { Component } from 'react'
import MineHeader from '../../components/mine-header/index.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import battle from '../../common/images/battle.png'
import avatar2 from '../../common/images/avatar2.png'
import bnb from '../../common/images/bnb.png'
import { Link } from 'react-router-dom';
import './detailPage.scss'
class DetailPage extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    prvImg: ''
	  }
	}
	componentDidMount() { // 生命周期 类似mounted
		window.scrollTo (0,0);
	}
	render() {
		const {prvImg} = this.state
		return (
			<div className="detail-page">
				<MineHeader/>
				<div className="main-content">
					<div className="main-row">
						<div className="pic-wrap acea-row row-between">
							<div className="pic-left-wrap">
								<img className="pic" src={battle} onClick={() => this.setState({prvImg: battle})}/>
							</div>
							<div className="pic-right-wrap acea-row row-between">
								<div className="pic-right-item">
									<img className="pic" src={battle} onClick={() => this.setState({prvImg: battle})}/>
								</div>
								<div className="pic-right-item">
									<img className="pic" src={battle} onClick={() => this.setState({prvImg: battle})}/>
								</div>
								<div className="pic-right-item">
									<img className="pic" src={battle} onClick={() => this.setState({prvImg: battle})}/>
								</div>
								<div className="pic-right-item">
									<img className="pic" src={battle} onClick={() => this.setState({prvImg: battle})}/>
								</div>
							</div>
						</div>
						<div className="details-wrap">
							<div style={{padding: '0 50px'}}>
								<div className="acea-row row-between row-middle">
									<div className="acea-row row-middle">
										<div className="avatar-wrap acea-row row-center-wrapper">
											<img src={avatar2}/>
										</div>
										<div >
											<div className="project-title">Battle Saga</div>
											<div className="project-subtitle">$BTLS</div>
										</div>
									</div>
									<Link to="/join" className="join-detail-btn bt acea-row row-center-wrapper">Join Deal</Link>
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
							</div>
							<div className="token-info-wrap">
								<div className="ct-title">Token Information</div>
								<div className="acea-row" style={{marginTop: '42px'}}>
									<div className="detail-item acea-row row-between">
										<div>Name</div>
										<div>Battle Saga</div>
									</div>
									<div className="detail-item acea-row row-between">
										<div>Token</div>
										<div>STLS</div>
									</div>
									<div className="detail-item acea-row row-between">
										<div>Token Price</div>
										<div>$0.05</div>
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
											<img src={bnb}/>
											<div>BSC</div>
										</div>
									</div>
									<div className="detail-item acea-row row-between" style={{opacity: 0}}>
										
									</div>
								</div>
							</div>
							<div className="about-info-wrap">
								<div className="ct-title">About Battle Saga</div>
								<div className="about-text">
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
							</div>
						</div>
					</div>
				</div>
				<div className={['mask','acea-row','row-center-wrapper', prvImg?'pop-active':''].join(' ')} onClick={()=>this.setState({prvImg: ''})}>
					{prvImg ? <img src={prvImg} /> : null}
				</div>
				<HowToParticipate/>
				<MineFooter/>
			</div>
			
		)
	}
}
export default DetailPage