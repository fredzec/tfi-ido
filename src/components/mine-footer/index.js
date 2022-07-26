import React, { Component } from 'react'
import logo from '../../common/images/logo.png'
import pancakeSwap from '../../common/images/pancakeSwap-w.png'
import mexcGlobal from '../../common/images/mexcGlobal-w.png'
import en from '../../common/images/en.png'
import tu from '../../common/images/tu.png'
import vi from '../../common/images/vi.png'
import kr from '../../common/images/kr.png'
import fr from '../../common/images/fr.png'
import ch from '../../common/images/ch.png'
import ind from '../../common/images/in.png'
import twitter from '../../common/images/twitter.png'
import medium from '../../common/images/medium.png'
import linkedin from '../../common/images/linkedin.png'
import telegram from '../../common/images/telegram.png'
import './index.scss'

class MineFooter extends Component {
    render() {
        return (
            <div className="footer">
                <div className="main-row acea-row">
					<div className="footer-item">
						<img className="logo" src={logo} />
						<div className="logo-desc">
							TrustFi focuses on early crypto assets issuance, liquidity management,
							community activities and DAO governance to unlock the potential of DeFi.
						</div>
						<div className="buy-tfi">Buy $TFI</div>
						<a href="https://pancakeswap.finance/swap?outputCurrency=0x7565ab68d3f9dadff127f864103c8c706cf28235" target="_blank" className="support-item">
							<img src={pancakeSwap} className="support-img"/>
							<div>TFI/BNB</div>
						</a>
						<a href="https://www.mexc.com/exchange/TRUSTFI_USDT" target="_blank" className="support-item">
							<img src={mexcGlobal} className="support-img"/>
							<div>TRUSTFI/USDT</div>
						</a>
					</div>
					<div className="footer-item footer-about">
						<div className="footer-item-title">About Us</div>
						<a href="https://docs.trustfi.org/" target="_blank" className="footer-item-text">Whitepaper</a>
						<a href="https://www.certik.com/projects/trustfinetwork" target="_blank" className="footer-item-text">Smart Contract Audits</a>
						<a href="https://trustfi.medium.com/" target="_blank" className="footer-item-text">Blog</a>
						<a href="https://medium.com/trustfi/attention-trustfi-is-hiring-435118c385fa" target="_blank" className="footer-item-text">Join Us</a>
					</div>
					<div className="footer-item  footer-telegram">
						<div className="footer-item-title">Telegram Community</div>
						<a href="https://t.me/trustfi_fans" target="_blank" className="footer-item-text">
							<img src={en} className="flag"/>
							<div>English Community</div>
						</a>
						<a href="https://t.me/TrustFiTurkey" target="_blank" className="footer-item-text">
							<img src={tu} className="flag"/>
							<div>Turkish Community</div>
						</a>
						<a href="https://t.me/TrustFiIDN" target="_blank" className="footer-item-text">
							<img src={ind} className="flag"/>
							<div>Indonesian Community</div>
						</a>
						<a href="https://t.me/tfivngroup" target="_blank" className="footer-item-text">
							<img src={vi} className="flag"/>
							<div>Vietnamese Community</div>
						</a>
						<a href="https://open.kakao.com/o/grQCY7Kd" target="_blank" className="footer-item-text">
							<img src={kr} className="flag"/>
							<div>Korean Community (Kakao)</div>
						</a>
						<a href="https://t.me/trustfi_francais" target="_blank" className="footer-item-text">
							<img src={fr} className="flag"/>
							<div>French Community</div>
						</a>
						<a href="https://t.me/trustfichinese" target="_blank" className="footer-item-text">
							<img src={ch} className="flag"/>
							<div>Chinese Community</div>
						</a>
					</div>
					<div className="footer-item footer-social">
						<div className="footer-item-title">Our Social Network</div>
						<a href="https://twitter.com/trustfiorg" target="_blank" className="footer-item-text">
							<img src={twitter} className="s-icon"/>
							<div>TrustFi on Twitter</div>
						</a>
						<a href="https://blog.trustfi.org/" target="_blank" className="footer-item-text">
							<img src={medium} className="s-icon"/>
							<div>TrustFi on Medium</div>
						</a>
						<a href="https://www.linkedin.com/company/trustfi" target="_blank" className="footer-item-text">
							<img src={linkedin} className="s-icon"/>
							<div>TrustFi on Linkedin</div>
						</a>
						<a href="https://t.me/trustfi_channel" target="_blank" className="footer-item-text">
							<img src={telegram} className="s-icon"/>
							<div>TrustFi on Telegram</div>
						</a>
					</div>
				</div>
            </div>
        )
    }
}

export default MineFooter
