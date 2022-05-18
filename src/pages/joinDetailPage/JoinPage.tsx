import React from "react";
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import MineHeader from '../../components/mine-header/index.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import './joinDetailPage.scss'
import {
  useFetchIdoPoolsPublicData,
  useFetchIdoPoolsUserData,
  useGetIdoByNameKey,
  useIdoState
} from "../../state/ido/hooks";
import bnb from "../../common/images/bnb.png";
import JoinContent from "./components/JoinContent";
import PicBanner from "./components/PicBanner";


interface paramsProps {
  nameKey: string,
}

const JoinPage:React.FC = ()=>{
  useFetchIdoPoolsPublicData()
  useFetchIdoPoolsUserData()
  const {nameKey} = useParams<paramsProps>()
  const findIdo = useGetIdoByNameKey(nameKey)
  const history = useHistory()
  history.listen(route => {
    window.scrollTo(0,0)
  });

  return (
    <div className="join-detail-page">
      <MineHeader/>
      <PicBanner pool={findIdo}/>
      <JoinContent detail={findIdo} version='v1'/>
      <HowToParticipate/>
      <MineFooter/>
    </div>
  )
}

export default JoinPage
