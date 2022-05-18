import React from "react";
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import MineHeader from '../../components/mine-header/index.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import './joinDetailPage.scss'
import {
  useFetchIdoPoolsPublicDataV2,
  useFetchIdoPoolsUserDataV2,
} from "../../state/idoV2/hooks";
import PicBanner from "./components/PicBanner";
import {useGetIdoByNameKeyV2} from "../../state/idoV2/hooks";
import JoinContentV2 from "./components/JoinContentV2";

interface paramsProps {
  nameKey: string,
}

const JoinPageV2:React.FC = ()=>{
  useFetchIdoPoolsPublicDataV2()
  useFetchIdoPoolsUserDataV2()
  const {nameKey} = useParams<paramsProps>()
  const findIdo = useGetIdoByNameKeyV2(nameKey)
  const history = useHistory()
  history.listen(route => {
    window.scrollTo(0,0)
  });

  return (
    <div className="join-detail-page">
      <MineHeader/>
      <PicBanner pool={findIdo}/>
      <JoinContentV2 detail={findIdo} version='v2'/>
      <HowToParticipate/>
      <MineFooter/>
    </div>
  )
}

export default JoinPageV2
