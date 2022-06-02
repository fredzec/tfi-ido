import React, { Component } from 'react'
import './index.scss'

class HowToParticipate extends Component {
    render() {
        return (
            <div className="how-to-participate-wrap">
               <div className="main-row acea-row row-between">
					<div className="htp-right">
						<div className="htp-title">How to Participate?</div>
						<div className="tips-wrap">
							<div className="tips-tips">Tips:</div>
							<div className="tips-content">IGO usually lasts one hour and everyone can participate without any fee.</div>
							<div className="tips-content">Remember to add the Official Contract Address of IGO tokens into your wallet.</div>
						</div>
					</div>
					<div className="htp-left">
						<div className="acea-row row-between">
							<div className="progress-item-wrap">
								<div className="acea-row row-middle htp-item-title">
									<div className="htp-num">1</div>
									<div>Get Whitelisted</div>
								</div>
								<div className="htp-item-content">
									Users need to Buy and Stake the minimum amount designated for their desired Allocation Tier before the IDO Snapshot is taken.
								</div>
							</div>
							<div className="progress-item-wrap">
								<div className="acea-row row-middle htp-item-title">
									<div className="htp-num">2</div>
									<div>Prepare funds</div>
								</div>
								<div className="htp-item-content">
									Before the IDO, you need to get your fund prepared in your wallet, such as USDT, BUSD, BNB, etc.
								</div>
							</div>
						</div>
						<div className="acea-row row-between">
							<div className="progress-item-wrap">
								<div className="acea-row row-middle htp-item-title">
									<div className="htp-num">3</div>
									<div>Commit funds</div>
								</div>
								<div className="htp-item-content">
									During the fundraising time, you can need input the valid amount and commit your funds.
								</div>
							</div>
							<div className="progress-item-wrap">
								<div className="acea-row row-middle htp-item-title">
									<div className="htp-num">4</div>
									<div>Claim your tokens</div>
								</div>
								<div className="htp-item-content">
									You will be able to claim your tokens when claiming time.
								</div>
							</div>
						</div>
					</div>
			   </div>
            </div>
        )
    }
}

export default HowToParticipate
