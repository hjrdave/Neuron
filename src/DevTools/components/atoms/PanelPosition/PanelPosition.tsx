import React from "react";
import Image from "react-bootstrap/Image";
import PositionRightIcon from "../../../assets/position-right.svg";
import PositionLeftIcon from "../../../assets/position-left.svg";
import PositionTopIcon from "../../../assets/position-top.svg";
import PositionBottomIcon from "../../../assets/position-bottom.svg";
import usePanelPosition from "../../../hooks/usePanelPosition";

export default function PanelPosition() {
  const panelPosition = usePanelPosition();
  return (
    <>
      <div className={"d-flex align-items-center justify-content-end h-100"}>
        <Image
          src={PositionRightIcon}
          width={"20rem"}
          className={"me-2"}
          onClick={panelPosition.attachRight}
        />
        <Image
          src={PositionLeftIcon}
          width={"20rem"}
          className={"me-2"}
          onClick={panelPosition.attachLeft}
        />
        <Image
          src={PositionTopIcon}
          width={"20rem"}
          className={"me-2"}
          onClick={panelPosition.attachTop}
        />
        <Image
          src={PositionBottomIcon}
          width={"20rem"}
          className={"me-2"}
          onClick={panelPosition.attachBottom}
        />
        <i className="fa-solid fa-minus" onClick={panelPosition.closePanel}></i>
      </div>
    </>
  );
}
