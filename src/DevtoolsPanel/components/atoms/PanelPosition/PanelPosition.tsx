import React from "react";
import Stack from "react-bootstrap/Stack";
import PositionRightIcon from "../../../assets/position-right.svg";
import PositionLeftIcon from "../../../assets/position-left.svg";
import PositionTopIcon from "../../../assets/position-top.svg";
import PositionBottomIcon from "../../../assets/position-bottom.svg";
import { PanelPositions } from "../../../Store";
import usePanel from "../../../hooks/usePanel";
import useCustomStyles from "../../../hooks/useCustomStyles";
import styles from "./PanelPosition.module.scss";

export default function PanelPosition() {
  const { customStyles } = useCustomStyles();
  const panelPosition = usePanel();
  return (
    <>
      <Stack
        gap={2}
        direction={"horizontal"}
        className={styles.compContainer}
        style={customStyles.panelPositionContainer}
      >
        <img
          src={PositionLeftIcon}
          className={`${styles.positionIcon} ${
            panelPosition.position === PanelPositions.Left ? styles.active : ""
          }`}
          onClick={panelPosition.attachLeft}
        />
        <img
          src={PositionTopIcon}
          className={`${styles.positionIcon} ${
            panelPosition.position === PanelPositions.Top ? styles.active : ""
          }`}
          onClick={panelPosition.attachTop}
        />
        <img
          src={PositionRightIcon}
          className={`${styles.positionIcon} ${
            panelPosition.position === PanelPositions.Right ? styles.active : ""
          }`}
          onClick={panelPosition.attachRight}
        />
        <img
          src={PositionBottomIcon}
          className={`${styles.positionIcon} ${
            panelPosition.position === PanelPositions.Bottom
              ? styles.active
              : ""
          }`}
          onClick={panelPosition.attachBottom}
        />
      </Stack>
    </>
  );
}
