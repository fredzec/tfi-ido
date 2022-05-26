import React, { Component } from 'react'
import pancakeSwap from '../../common/images/pancakeSwap.png'
import mexcGlobal from '../../common/images/mexcGlobal.png'
import hoo from '../../common/images/hoo-w.png'
import './homePage.scss'
import rocket from '../../common/images/rocket.png'
import arrowRight from '../../common/images/arrow-right.png'

class TopDesc extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    showBuyPop: false,
	  }
	}
	componentDidMount() { // 生命周期 类似mounted
		document.documentElement.addEventListener('click', this.pageClick.bind(this))
	}
	componentWillUnmount() { // 组件销毁 解除绑定事件
	  document.documentElement.removeEventListener('click', this.pageClick.bind(this))
	}
	pageClick() {
		this.setState({showBuyPop: false})
	}
	showPop(e) {
		e.stopPropagation()
		this.setState({showBuyPop: true})
	}
    render() {
		const {showBuyPop} = this.state
        return (
            <div className="main-row acea-row row-middle top-desc">
				<div className="desc-wrap">
					<div className="desc-title">TrustFi Launchpad</div>
					<div className="desc-title ye">Built on Web 3.0</div>
					<div className="desc">TrustFi focuses on early crypto assets issuance, liquidity management,  community activities and DAO governance to unlock the potential of DeFi</div>
					<div className="acea-row">
						<div style={{position: 'relative'}}>
							<div className="d-btn g bt" onClick={this.showPop.bind(this)}>Buy $TFI</div>
							{
								showBuyPop ? (<div className="buy-pop">
									<a href="https://pancakeswap.finance/swap?outputCurrency=0x7565ab68d3f9dadff127f864103c8c706cf28235" target="_blank" className="support-item">
										<img src={pancakeSwap} className="support-img"/>
										<div>TFI/BNB</div>
									</a>
									<a href="https://www.mexc.com/exchange/TRUSTFI_USDT" target="_blank" className="support-item">
										<img src={mexcGlobal} className="support-img"/>
										<div>TRUSTFI/USDT</div>
									</a>
									<a href="https://www.hoo.com/spot/tfi-usdt" target="_blank" className="support-item">
										<img src={hoo} className="support-img hoo"/>
										<div>TFI/USDT</div>
									</a>
								</div>) : null
							}
						</div>
						<a href="https://go-application.typeform.com/TrustFi-IDO" className="d-btn y bt">Apply for Launchpad</a>
						<a href="https://www.certik.com/projects/trustfinetwork" target="_blank" className="d-btn b bt">Audit Report</a>
					</div>
					<div className="news acea-row row-middle">
						<div className="green-dot"></div>
						<div className="news-t">News:</div>
						<div className="flex1 line1 news-content">
							New Mining Farm will go live on Cheers New Mining Farm will go live on Cheers
						</div>
						<img src={arrowRight} className="arrow-right"/>
					</div>
				</div>
				<div className="flex1"></div>
				<img src={rocket} className="rocket"/>
				<div className="flex1"></div>
            </div>
        )
    }
}

export default TopDesc
