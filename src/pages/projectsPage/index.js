import React, { Component } from 'react'
import './projectsPage.scss'
import MineHeader from '../../components/mine-header/index.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import ProjectsItem from '../../components/projects-item/index.js'
import avatar1 from '../../common/images/avatar1.png'
import avatar2 from '../../common/images/avatar2.png'
import avatar3 from '../../common/images/avatar3.png'
import ProjectList from "./components/ProjectList";

class ProjectsPage extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    closedPrjects: [{
	    	avatar: avatar1,
	    	name: 'CHEERS#3',
	    	subName: '$CHEERS',
	    	type: 'IGO3',
	    	launchDate: '07/12/2021',
	    	endDate: '07/12/2021',
	    	tokenPrice: '$0.05',
	    	tokenDistribution: 'Claim',
	    	projectWebsite: 'Meland.ai',
	    	salePrice: '1 BUSD = 8 CHEERS',
	    	IGOStarts: '10:00 AM 29th UTC',
	    	IGOEnds: '1:00 PM 29th UTC',
	    	ClaimStarts: '3:30 PM 29th UTC'
	    },{
	    	avatar: avatar3,
	    	name: 'Meland.ai',
	    	subName: '$MELD',
	    	type: 'IGO3',
	    	launchDate: '07/12/2021',
	    	endDate: '07/12/2021',
	    	tokenPrice: '$0.05',
	    	tokenDistribution: 'Claim',
	    	projectWebsite: 'Meland.ai',
	    	salePrice: '1 BUSD = 181.81 MELD',
	    	IGOStarts: '7:00 AM 7th UTC',
	    	IGOEnds: '10:00 AM 7th UTC',
	    	ClaimStarts: ''
	    },{
	    	avatar: avatar2,
	    	name: 'Battle Saga',
	    	subName: '$BTL',
	    	type: 'IGO3',
	    	launchDate: '07/12/2021',
	    	endDate: '07/12/2021',
	    	tokenPrice: '$0.05',
	    	tokenDistribution: 'Claim',
	    	projectWebsite: 'Meland.ai',
	    	salePrice: '1 BUSD = 10 BTL',
	    	IGOStarts: '10:00 AM 21th UTC',
	    	IGOEnds: '1:00 PM 21th UTC',
	    	ClaimStarts: ''
	    }],
		closedFlashIDO: [
			// {
			// 	avatar: avatar1,
			// 	name: 'CHEERS',
			// 	subName: '$CHEERS',
			// 	type: 'IGO3',
			// 	launchDate: '07/12/2021',
			// 	endDate: '07/12/2021',
			// 	tokenPrice: '$0.05',
			// 	tokenDistribution: 'Claim',
			// 	projectWebsite: 'Meland.ai'
			// }
		],
		upcomingProjects: [
			// {
			// 	avatar: avatar2,
			// 	name: 'Battle Saga',
			// 	subName: '$BTLS',
			// 	type: 'IGO',
			// 	launchDate: '07/12/2021',
			// 	endDate: '07/12/2021',
			// 	tokenPrice: '$0.05',
			// 	tokenDistribution: 'Claim',
			// 	projectWebsite: 'Meland.ai',
			// 	tag: 'MAIN IGO'
			// },
			// {
			// 	avatar: '',
			// 	name: '',
			// 	subName: '',
			// 	type: 'IGO',
			// 	launchDate: '07/12/2021',
			// 	endDate: '07/12/2021',
			// 	tokenPrice: '$0.05',
			// 	tokenDistribution: 'Claim',
			// 	projectWebsite: 'Meland.ai',
			// 	needApply: true
			// }
		]
	  }
	}
	componentDidMount() { // 生命周期 类似mounted
		window.scrollTo (0,0);
	}
    render() {
		const {closedPrjects, closedFlashIDO, upcomingProjects} = this.state
        return (
            <div className="projects-page">
				<MineHeader/>
				<div className="projects">
					<div className="main-row">
						<div className="p-title">Upcoming Projects</div>
						<ProjectList viewKey="upcoming"/>
						{/*
						<div className="acea-row">
							{upcomingProjects.map((item,index) => <ProjectsItem itemData={item} key={index} />)}
						</div>
						*/}
						<div className="p-title">Closed Projects</div>
						<ProjectList viewKey="closed" />
						{/*
						<div className="acea-row">
							{closedFlashIDO.map((item, index) => <ProjectsItem itemData={item} key={index} />)}
						</div>
						*/}
					</div>
				</div>
				<HowToParticipate/>
				<MineFooter/>
            </div>
        )
    }
}

export default ProjectsPage
