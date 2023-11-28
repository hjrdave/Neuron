import React from "react";
import Image from "react-bootstrap/Image";
import PositionRightIcon from "../../../assets/position-right.svg";
import PositionLeftIcon from "../../../assets/position-left.svg";
import PositionTopIcon from "../../../assets/position-top.svg";
import PositionBottomIcon from "../../../assets/position-bottom.svg";

export default function PanelPosition() {
  return (
    <>
      <div className={"d-flex align-items-center justify-content-end h-100"}>
        <Image src={PositionRightIcon} width={"20rem"} className={"me-2"} />
        <Image src={PositionLeftIcon} width={"20rem"} className={"me-2"} />
        <Image src={PositionTopIcon} width={"20rem"} className={"me-2"} />
        <Image src={PositionBottomIcon} width={"20rem"} className={"me-2"} />
        <i className="fa-solid fa-expand text-success fs-5"></i>
      </div>
    </>
  );
}
