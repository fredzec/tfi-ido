import React, {useState} from "react";
import battle from "../../../common/images/battle.png";
import {IdoConfig, IdoConfigV2} from "../../../state/types";

interface props {
  pool: IdoConfig | IdoConfigV2
}
const PicBanner:React.FC<props> = ({pool})=>{
  const [prvImg,setPrvImg] = useState('')

  return pool?(
    <div className="main-row">
      <div className="pic-wrap acea-row row-between">
        <div className="pic-left-wrap">
          <img className="pic" src={pool.pic1} onClick={() => setPrvImg(pool.pic1)}/>
        </div>
        <div className="pic-right-wrap acea-row row-between">
          <div className="pic-right-item">
            <img className="pic" src={pool.pic2} onClick={() => setPrvImg(pool.pic2)}/>
          </div>
          <div className="pic-right-item">
            <img className="pic" src={pool.pic3} onClick={() => setPrvImg(pool.pic3)}/>
          </div>
          <div className="pic-right-item">
            <img className="pic" src={pool.pic4} onClick={() => setPrvImg(pool.pic4)}/>
          </div>
          <div className="pic-right-item">
            <img className="pic" src={pool.pic5} onClick={() => setPrvImg(pool.pic5)}/>
          </div>
        </div>
        <div className={['mask','acea-row','row-center-wrapper', prvImg?'pop-active':''].join(' ')} onClick={()=>setPrvImg('')}>
          {prvImg ? <img src={prvImg} /> : null}
        </div>
      </div>
    </div>
  ):null
}

export default PicBanner
