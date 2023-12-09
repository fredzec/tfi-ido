import React, { useEffect } from 'react'
import './homePage.scss'
import MineHeader from '../../components/mine-header/index.js'
import TopDesc from './top-desc.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import ProjectList from "../projectsPage/components/ProjectList";
import { useFetchIdoPoolsPublicDataV2, useFetchIdoPoolsUserDataV2 } from "../../state/idoV2/hooks";

const HomePage = () => {
  // useFetchIdoPoolsPublicData()
  // useFetchIdoPoolsUserData()
  useFetchIdoPoolsPublicDataV2()
  useFetchIdoPoolsUserDataV2()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
      <div className="home-page">
        <MineHeader/>
        <TopDesc/>
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

export default HomePage
