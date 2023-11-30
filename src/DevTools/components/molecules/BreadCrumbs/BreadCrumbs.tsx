import React from "react";
import Button from "react-bootstrap/Button";
import Crumb, { CrumbTypes } from "../../atoms/Crumb";

interface Props {
  storeName: string;
  stateKey?: string;
  stateType?: "state" | "features" | "actions" | "payload";
}

export default function BreadCrumbs({ storeName, stateKey, stateType }: Props) {
  return (
    <>
      <Button variant="none" size="sm" className={`me-2 border-0`}>
        <Crumb type={CrumbTypes.Store} label={storeName} />
        {stateKey ? <Crumb label={stateKey} /> : null}
        {stateType === "state" ? (
          <Crumb type={CrumbTypes.State} label={"State"} hideArrow />
        ) : null}
        {stateType === "payload" ? (
          <Crumb type={CrumbTypes.Payload} label={"Payload"} hideArrow />
        ) : null}
        {stateType === "features" ? (
          <Crumb type={CrumbTypes.Features} label={"Features"} hideArrow />
        ) : null}
        {stateType === "actions" ? (
          <Crumb type={CrumbTypes.Actions} label={"Actions"} hideArrow />
        ) : null}
      </Button>
    </>
  );
}
