import React from "react";
import Image from "react-bootstrap/Image";
import LogoNeuron from "../../../assets/logo-neuron.webp";
import usePanelPosition from "../../../hooks/usePanelPosition";

export default function FloatingIcon() {
  const panelPosition = usePanelPosition();
  return (
    <>
      <div
        className={`p-2 fixed-bottom start-0 rounded-circle m-3 bg-dark shadow-lg ${
          panelPosition.open ? "d-none" : ""
        }`}
        style={{ width: "75px", height: "75px" }}
        onClick={panelPosition.openPanel}
      >
        <Image src={LogoNeuron} fluid />
      </div>
    </>
  );
}
