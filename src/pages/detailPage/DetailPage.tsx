import React from "react";
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import MineHeader from '../../components/mine-header/index.js'
import HowToParticipate from '../../components/how-to-participate/index.js'
import MineFooter from '../../components/mine-footer/index.js'
import './detailPage.scss'
import PicBanner from "./components/PicBanner";
import {useFetchIdoPoolsPublicData, useFetchIdoPoolsUserData, useGetIdoByNameKey} from "../../state/ido/hooks";
import ProInfo from "./components/ProInfo";
import TokenInfomation from "./components/TokenInfomation";


interface paramsProps {
  nameKey: string,
}

const DetailPage:React.FC = ()=>{
  useFetchIdoPoolsPublicData()
  useFetchIdoPoolsUserData()
  const {nameKey} = useParams<paramsProps>()
  const findIdo = useGetIdoByNameKey(nameKey)
  const history = useHistory()
  history.listen(route => {
    window.scrollTo(0,0)
  });

  return (
    <div className="detail-page">
      <MineHeader/>
      <div className="main-content">
        <div className="main-row">
          <PicBanner />
          <div className="details-wrap">
            <ProInfo detail={findIdo} />
            <TokenInfomation detail={findIdo} />

            <div className="about-info-wrap">
              <div className="ct-title">About {findIdo?.name}</div>
              <div className="about-text">
                <p>
                  Virtual interaction with other users using a hero NFT Avatar
                  Build shops, party halls, offices, meeting halls and organize social gatherings
                  Build different Games on the LandsVirtual interaction with other users using a hero NFT Avatar
                  Build shops, party halls, offices, meeting halls and organize social gatherings
                  Build different Games on the Lands
                </p>
                <p>
                  Virtual interaction with other users using a hero NFT Avatar
                  Build shops, party halls, offices, meeting halls and organize social gatherings
                  Build different Games on the Lands
                  Virtual interaction with other users using a hero NFT Avatar.
                </p>
                <p>
                  Virtual interaction with other users using a hero NFT Avatar
                  Build shops, party halls, offices, meeting halls and organize social gatherings
                  Build different Games on the LandsVirtual interaction with other users using a hero NFT Avatar
                  Build shops, party halls, offices, meeting halls and organize social gatherings
                  Build different Games on the Lands
                </p>
                <p>
                  Virtual interaction with other users using a hero NFT Avatar
                  Build shops, party halls, offices, meeting halls and organize social gatherings
                  Build different Games on the Lands
                  Virtual interaction with other users using a hero NFT Avatar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HowToParticipate/>
      <MineFooter/>
    </div>
  )
}

export default DetailPage
