import React from "react"
import { IdoConfigV2 } from "../../../state/types"
import Circular from "../../components/Circular"
import TokenInformationV2 from "./TokenInformationV2"
import styled from "styled-components"
import { useIdoStateV3 } from "../../../state/idoV3/hooks"
import ParticipateV3 from "./ParticipateV3"

interface props {
  detail: IdoConfigV2
}

const JoinContentV3: React.FC<props> = ({ detail }) => {
  const { dataLoaded } = useIdoStateV3()
  return dataLoaded ? (
    detail ? (
      <div className="main-content">
        <div className="main-row" style={{ position: 'relative', overflow: 'visible' }}>
          <div className="tag">{detail.idoType}</div>
          <div className="acea-row row-middle">
            <div className="avatar">
              <img src={detail.avatar}/>
            </div>
            <div>
              <div className="project-title">{detail.name}</div>
              <div className="project-subtitle">{detail.subName}</div>
            </div>
          </div>
          <div className="project-desc-text">{detail.description}</div>

          {/* Participate view box */}
          <ParticipateV3 detail={detail}/>

          {/* Ido Information view box */}
          <TokenInformationV2 detail={detail}/>

          <div className="about-wrap">
            <div className="pd-title">About the Project</div>
            <div style={{ height: '200px' }}>{detail.about}</div>
            <StyledSocialRow>
              {detail.website && detail.website !== '' && (
                <a href={`${detail.website.slice(0, 4) === "http" ? '' : 'https://'}${detail.website}`} target="_blank"
                   rel="noreferrer">
                  <StyledSocialItem>
                    <img src="/images/social/website.png" alt="website"/>
                  </StyledSocialItem>
                </a>
              )}
              {detail.twitter && detail.twitter !== '' && (
                <a href={`${detail.twitter.slice(0, 4) === "http" ? '' : 'https://'}${detail.twitter}`} target="_blank"
                   rel="noreferrer">
                  <StyledSocialItem>
                    <img src="/images/social/twitter-icon.png" alt="twitter"/>
                  </StyledSocialItem>
                </a>
              )}
              {detail.telegram && detail.telegram !== '' && (
                <a href={`${detail.telegram.slice(0, 4) === "http" ? '' : 'https://'}${detail.telegram}`}
                   target="_blank" rel="noreferrer">
                  <StyledSocialItem>
                    <img src="/images/social/telegram-icon.png" alt="telegram"/>
                  </StyledSocialItem>
                </a>
              )}
            </StyledSocialRow>
          </div>
        </div>
      </div>) : (
      <div className="main-row" style={{ position: 'relative' }}>
        No Result
      </div>
    )
  ) : (
    <Circular/>
  )
}

const StyledSocialRow = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`
const StyledSocialItem = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;

    & img {
        width: 40px;
        height: 40px;
        object-fit: contain;
    }
`
export default JoinContentV3
