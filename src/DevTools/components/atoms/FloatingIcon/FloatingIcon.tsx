import React, { CSSProperties } from "react";
import Image from "react-bootstrap/Image";
import LogoNeuron from "../../../assets/logo-neuron.webp";
import usePanelPosition from "../../../hooks/usePanelPosition";
import styles from "./FloatingIcon.module.scss";

interface Props {
  openPanel?: boolean;
  customStyles?: CSSProperties;
}
export default function FloatingIcon({ openPanel, customStyles }: Props) {
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
