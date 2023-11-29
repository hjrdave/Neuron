import React from "react";
import Image from "react-bootstrap/Image";
import PositionRightIcon from "../../../assets/position-right.svg";
import PositionLeftIcon from "../../../assets/position-left.svg";
import PositionTopIcon from "../../../assets/position-top.svg";
import PositionBottomIcon from "../../../assets/position-bottom.svg";
import { PanelPositions } from "../../../Store";
import usePanelPosition from "../../../hooks/usePanelPosition";
import styles from "./PanelPosition.module.scss";

export default function PanelPosition() {
  const panelPosition = usePanelPosition();
  return (
    <>
      <div className={"d-flex align-items-center justify-content-end h-100"}>
        <Image
          src={PositionRightIcon}
          width={"20rem"}
          className={`me-2 ${styles.hover} ${
            panelPosition.position === PanelPositions.Right ? styles.active : ""
          }`}
          onClick={panelPosition.attachRight}
        />
        <Image
          src={PositionLeftIcon}
          width={"20rem"}
          className={`me-2 ${styles.hover} ${
            panelPosition.position === PanelPositions.Left ? styles.active : ""
          }`}
          onClick={panelPosition.attachLeft}
        />
        <Image
          src={PositionTopIcon}
          width={"20rem"}
          className={`me-2 ${styles.hover} ${
            panelPosition.position === PanelPositions.Top ? styles.active : ""
          }`}
          onClick={panelPosition.attachTop}
        />
        <Image
          src={PositionBottomIcon}
          width={"20rem"}
          className={`me-2 ${styles.hover} ${
            panelPosition.position === PanelPositions.Bottom
              ? styles.active
              : ""
          }`}
          onClick={panelPosition.attachBottom}
        />
        <i
          className={`fa-solid fa-minus text-success ${styles.hover}`}
          onClick={panelPosition.closePanel}
        ></i>
      </div>
    </>
  );
}
