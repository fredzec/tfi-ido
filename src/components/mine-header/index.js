import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../common/images/logo.png'
import BNB from '../../common/images/bnb.png'
import './index.scss'
import BigNumber from "bignumber.js";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useAuth from "../../hooks/useAuth";
import {DEFAULT_TOKEN_DECIMAL,walletSet} from "../../config";
import tokens from "../../config/constants/tokens";
import {useWalletModal} from "@vipswap/uikit";
import {useGetBnbBalance} from "../../hooks/useTokenBalance";
import MenuButton from "./MenuButton";
import styled, {keyframes} from "styled-components";
// import { withRouter } from 'react-router-dom'


function WalletFun() {
	const { account, chainId } = useActiveWeb3React()
	const { login, logout, } = useAuth()
	const tokenBalanceData = useGetBnbBalance()
	const tokenBalance = new BigNumber(tokenBalanceData.balance).div(DEFAULT_TOKEN_DECIMAL).toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })
	const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, walletSet.helpLink, walletSet.scanLink, walletSet.scanLabel,tokenBalance,tokens.bnb.symbol);
	const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

	const connectWallet = ()=>{
		if (account){
			onPresentAccountModal()
		}else{
			onPresentConnectModal()
		}

	}
	return (
		<div className="connect-btn acea-row row-center-wrapper bt" onClick={connectWallet}>
			{account?accountEllipsis:'Connect'}
		</div>
	)
}
class MineHeader extends Component {

	constructor(props){
	  super(props);
	  this.state = {
		showMenu: false
	  }
	}
	componentDidMount() { // 生命周期 类似mounted
		console.log(this.props);
	}
	goHome() {
		this.props.history.push('/home')
	}
	scrollToHp() {
		const el = document.querySelector('.how-to-participate-wrap')
		el.scrollIntoView({behavior: "smooth"})
	}
	goFAQ() {
		window.alert('comming soon!')
	}
	mobileMenuShow(status) {
		this.setState({
			showMenu: status
		})
	}



    render() {
		const {showMenu} = this.state

        return (
            <div className="header">
                <div className="header-top">
					$TFI  CONTRACT ADDRESS  0x7565ab68d3f9dadff127f864103c8c706cf28235
				</div>
				<div className="header-menu main-row acea-row row-between-wrapper">
					<Link to="/home">
						<img className="logo" src={logo} />
						<div className="acea-row row-right">
							<div className="logo-tag">Launchpad</div>
						</div>
					</Link>
					<div className="acea-row row-middle">
						<a  className="nav-item" href="https://trustfi.org" target="_self" rel="noreferrer">Home</a>
						<div className="nav-item" onClick={this.goFAQ.bind(this)}>FAQ</div>
						<div className="nav-item" onClick={this.scrollToHp.bind(this)}>How to Participate</div>
						<Link className="nav-item" to="/projects">Project</Link>
						<a  className="nav-item" href="https://farmerbsc.trustfi.org/" target="_blank" rel="noreferrer">Staking</a>
						<img className="bnb" src={BNB}/>
						{!showMenu && (
							<WalletFun/>
						)}
						<MenuButton clickFun={this.mobileMenuShow.bind(this)}/>
						{/*
						<div className="connect-btn acea-row row-center-wrapper bt" >Connect</div>
						*/}
					</div>
				</div>

				<StyledMobileMenu className={`header-menu main-row acea-row ${showMenu?'show':'hidden'}`}>
					<a  className="nav-item-m" href="https://trustfi.org" target="_self" rel="noreferrer">Home</a>
					<div className="nav-item-m" onClick={this.goFAQ.bind(this)}>FAQ</div>
					<div className="nav-item-m" onClick={this.scrollToHp.bind(this)}>How to Participate</div>
					<Link className="nav-item-m" to="/projects">Project</Link>
					<a  className="nav-item-m" href="https://farmerbsc.trustfi.org/" target="_blank" rel="noreferrer">Staking</a>

					<WalletFun/>
				</StyledMobileMenu>

            </div>
        )
    }
}

const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const hidden = keyframes`
  100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
`;
const StyledMobileMenu = styled.div`
	flex-direction: column;
	align-items: center;
	
	border-bottom: 4px solid #FEE108;
	background: #000;
	&.show {
		display: flex;
		// transition: all 5s;
		animation: ${show} .5s linear;
	}
	&.hidden {
		display: none;
		// transition: all 5s;
		animation: ${hidden} .5s linear;
	}
	
`
// export default withRouter(MineHeader)
export default MineHeader
