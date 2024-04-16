import React from "react"
import { useLocation, useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import MineHeader from '../../components/mine-header/index.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import './joinDetailPage.scss'
import PicBanner from "./components/PicBanner"
import { useFetchIdoPoolsPublicDataV3, useFetchIdoPoolsUserDataV3, useGetIdoByIdV3 } from "../../state/idoV3/hooks"
import JoinContentV3 from "./components/JoinContentV3"

interface paramsProps {
  nameKey: string,
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const JoinPageV3:React.FC = ()=>{
  const {nameKey} = useParams<paramsProps>()
  const query = useQuery()
  const poolId = Number(query.get('poolId'))
  useFetchIdoPoolsPublicDataV3(poolId)
  useFetchIdoPoolsUserDataV3(poolId)

  const findIdo = useGetIdoByIdV3(poolId)
  const history = useHistory()
  history.listen(() => {
    window.scrollTo(0,0)
  });

  return (
    <div className="join-detail-page">
      <MineHeader/>
      <PicBanner pool={findIdo}/>
      <JoinContentV3 detail={findIdo} />
      <HowToParticipate/>
      <MineFooter/>
    </div>
  )
}

export default JoinPageV3
