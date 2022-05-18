import React, {useState} from "react";
import styled from "styled-components";

interface props {
  clickFun?: (status: boolean)=>void
}
const MenuButton: React.FC<props> = ({clickFun})=>{
  const [isCheck,setIsCheck] = useState(false)
  const onClickFun = ()=>{
    const status = !isCheck
    setIsCheck(status)
    if (clickFun){
      clickFun(status)
    }
  }

  return (
    <StyledBtn onClick={onClickFun}>
      <StyledBar1 className={isCheck?'active':''}/>
      <StyledBar2 className={isCheck?'active':''} />
      <StyledBar3 className={isCheck?'active':''} />
    </StyledBtn>
  )
}
const StyledBtn = styled.div`
  height: 40px;
  width: 40px;
  position: relative;
  // margin: auto 10px;
  // padding-top: 8px;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justitfy-content:center;
  align-items: center;
  @media screen and (min-width: 1200px) {
    display: none;
  }
`
const StyledBarBase = styled.div`
  height: 4px;
  width: 28px;
  display: block;
  margin: 4px auto;
  position: relative;
  background-color: #FEE108;
  transition: 0.4s;
  position: absolute;
`
const StyledBar1 = styled(StyledBarBase)`
  top: 4px;
  // transition: top 0.3s ease 0.3s, transform 0.3s ease-out 0.1s;
  // animation: mrotr 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  animation: rotateR 1.5s cubic-bezier(0.5, 0.2, 0.2, 1);
  &.active {
    // top: 30px;
    // transform: rotate(45deg);
    // transition: top 0.3s ease 0.1s, transform 0.3s ease-out 0.5s;
    // transform: translateY(8px) rotate(45deg);
    transform: translateY(8px) rotate(-45deg);
  }
`
const StyledBar2 = styled(StyledBarBase)`
  top: 12px;
  // transition: ease 0.3s 0.3s;
  // animation: fade 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  animation: fade 1.5s cubic-bezier(0.1, 0.8, 0.1, 1);
  &.active {
    opacity: 0;
  }
`
const StyledBar3 = styled(StyledBarBase)`
  // anim 1 ----
  top: 20px;
  // transition: top 0.3s ease 0.3s, transform 0.3s ease-out 0.1s;
  // animation: mrotl 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  // anim 2 ---
  animation: rotateL 1.5s cubic-bezier(0.5, 0.2, 0.2, 1);
  &.active {
    // top: 30px;
    // transform: rotate(-45deg);
    // transition: top 0.3s ease 0.1s, transform 0.3s ease-out 0.5s;
    // transform: translateY(-8px) rotate(-45deg);
    transform: translateY(-8px) rotate(45deg);
  }
`

export default MenuButton
