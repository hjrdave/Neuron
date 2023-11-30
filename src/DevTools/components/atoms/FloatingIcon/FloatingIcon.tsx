import React, { CSSProperties } from "react";
import Image from "react-bootstrap/Image";
import LogoNeuron from "../../../assets/logo-neuron.webp";
import { PanelPositions } from "../../../Store";
import usePanelPosition from "../../../hooks/usePanelPosition";
import styles from "./FloatingIcon.module.scss";

interface Props {
  openPanel?: boolean;
  panelPosition?: PanelPositions;
  topPanel?: boolean;
  bottomPanel?: boolean;
  rightPanel?: boolean;
  leftPanel?: boolean;
  customStyles?: CSSProperties;
}
export default function FloatingIcon({
  openPanel,
  customStyles,
  panelPosition: position,
  topPanel,
  bottomPanel,
  rightPanel,
  leftPanel,
}: Props) {
  const panelPosition = usePanelPosition();
  React.useEffect(() => {
    if (openPanel) {
      panelPosition.openPanel();
    }
  }, []);
  const cssProperties = {
    width: "75px",
    height: "75px",
    ...customStyles,
  };
  React.useEffect(() => {
    bottomPanel
      ? panelPosition.attachBottom()
      : topPanel
      ? panelPosition.attachTop()
      : leftPanel
      ? panelPosition.attachLeft()
      : rightPanel
      ? panelPosition.attachRight()
      : panelPosition.attachTop();
  }, []);
  return (
    <>
      <div
        className={`${
          styles.compContainer
        } p-2 fixed-bottom start-0 rounded-circle m-3 bg-dark shadow-lg ${
          panelPosition.open ? "d-none" : ""
        }`}
        style={cssProperties}
        onClick={panelPosition.openPanel}
      >
        <Image src={LogoNeuron} fluid />
      </div>
    </>
  );
}
