import React, {useState} from "react";
import battle from "../../../common/images/battle.png";

const PicBanner:React.FC = ()=>{
  const [prvImg,setPrvImg] = useState('')

  return (
    <div className="pic-wrap acea-row row-between">
      <div className="pic-left-wrap">
        <img className="pic" src="/images/join/1.png" onClick={() => setPrvImg('/images/join/1.png')}/>
      </div>
      <div className="pic-right-wrap acea-row row-between">
        <div className="pic-right-item">
          <img className="pic" src="/images/join/2.png" onClick={() => setPrvImg('/images/join/2.png')}/>
        </div>
        <div className="pic-right-item">
          <img className="pic" src="/images/join/3.png" onClick={() => setPrvImg('/images/join/3.png')}/>
        </div>
        <div className="pic-right-item">
          <img className="pic" src="/images/join/4.png" onClick={() => setPrvImg('/images/join/4.png')}/>
        </div>
        <div className="pic-right-item">
          <img className="pic" src="/images/join/5.png" onClick={() => setPrvImg('/images/join/5.png')}/>
        </div>
      </div>
      <div className={['mask','acea-row','row-center-wrapper', prvImg?'pop-active':''].join(' ')} onClick={()=>setPrvImg('')}>
        {prvImg ? <img src={prvImg} /> : null}
      </div>
    </div>
  )
}

export default PicBanner
