import React, { Component } from 'react'
import './projectsPage.scss'
import MineHeader from '../../components/mine-header/index.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import avatar1 from '../../common/images/avatar1.png'
import avatar2 from '../../common/images/avatar2.png'
import avatar3 from '../../common/images/avatar3.png'
import ProjectList from "./components/ProjectList";

class ProjectsPage extends Component {
  constructor(props) {
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
        salePrice: '1 USDT = 8 CHEERS',
        IGOStarts: '10:00 AM 29th UTC',
        IGOEnds: '1:00 PM 29th UTC',
        ClaimStarts: '3:30 PM 29th UTC'
      }, {
        avatar: avatar3,
        name: 'Meland.ai',
        subName: '$MELD',
        type: 'IGO3',
        launchDate: '07/12/2021',
        endDate: '07/12/2021',
        tokenPrice: '$0.05',
        tokenDistribution: 'Claim',
        projectWebsite: 'Meland.ai',
        salePrice: '1 USDT = 181.81 MELD',
        IGOStarts: '7:00 AM 7th UTC',
        IGOEnds: '10:00 AM 7th UTC',
        ClaimStarts: ''
      }, {
        avatar: avatar2,
        name: 'Battle Saga',
        subName: '$BTL',
        type: 'IGO3',
        launchDate: '07/12/2021',
        endDate: '07/12/2021',
        tokenPrice: '$0.05',
        tokenDistribution: 'Claim',
        projectWebsite: 'Meland.ai',
        salePrice: '1 USDT = 10 BTL',
        IGOStarts: '10:00 AM 21th UTC',
        IGOEnds: '1:00 PM 21th UTC',
        ClaimStarts: ''
      }],
      closedFlashIDO: [],
      upcomingProjects: []
    }
  }

  componentDidMount() { // 生命周期 类似mounted
    window.scrollTo(0, 0);
  }

  render() {
    return (
        <div className="projects-page">
          <MineHeader/>
          <div className="projects">
            <div className="main-row">
              <div className="p-title">Upcoming Projects</div>
              <ProjectList viewKey="upcoming"/>
              <div className="p-title">Closed Projects</div>
              <ProjectList viewKey="closed"/>
            </div>
          </div>
          <HowToParticipate/>
          <MineFooter/>
        </div>
    )
  }
}

export default ProjectsPage
