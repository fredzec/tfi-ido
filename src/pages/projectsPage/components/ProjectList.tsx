import React from "react";
import {
  useFetchIdoPoolsPublicData,
  useFetchIdoPoolsUserData,
  useIdoState
} from "../../../state/ido/hooks";
import ProjectCard from "./ProjectCard";
import avatar1 from '../../../common/images/avatar1.png'
import avatar2 from '../../../asset/images/Battlesaga.png'
import avatar3 from '../../../asset/images/melandai.png'
import ProjectsItem from '../../../components/projects-item/index.js'
import {useFetchIdoPoolsPublicDataV2, useFetchIdoPoolsUserDataV2, useIdoStateV2} from "../../../state/idoV2/hooks";

interface props {
  viewKey: 'upcoming'| 'closed',
}
const closedPrjects =  [{
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
  }]
const ProjectList:React.FC<props> = ({viewKey})=>{
  const curTime = new Date().getTime()
  useFetchIdoPoolsPublicData()
  useFetchIdoPoolsUserData()
  useFetchIdoPoolsPublicDataV2()
  useFetchIdoPoolsUserDataV2()

  const {data: pools} = useIdoState()
  const {data: poolsV2} = useIdoStateV2()
  const activePools = pools.filter((item)=> item.endTime > curTime)
  const closePools = pools.filter((item)=> item.endTime <= curTime)
  const activePoolsV2 = poolsV2.filter((item)=> item.endTime > curTime)
  const closePoolsV2 = poolsV2.filter((item)=> item.endTime <= curTime)

  return viewKey  === 'closed'?(
    <div className="acea-row">
      {closePoolsV2.map((item) => <ProjectCard pool={item} key={item.poolId} viewKey="upcoming" version="v2"/>)}
      {closePools.map((item) => <ProjectCard pool={item} key={item.poolId} viewKey="upcoming" version="v1"/>)}
      {closedPrjects.map((item,index) => <ProjectsItem itemData={item} key={index} detailAble={false}  joinAble={false}/>)}
    </div>
  ):(
    <div className="acea-row">
      {activePoolsV2.map((item) => <ProjectCard pool={item} key={item.poolId} viewKey={viewKey} version="v2"/>)}
      {activePools.map((item) => <ProjectCard pool={item} key={item.poolId} viewKey={viewKey} version="v1"/>)}
    </div>
  )
}

export default ProjectList
