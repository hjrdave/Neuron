import React from "react";
import Button from "react-bootstrap/Button";
import Crumb, { CrumbTypes } from "../../atoms/Crumb";
import styles from "./BreadCrumbs.module.scss";

interface Props {
  storeName: string;
  stateKey?: string;
  payload?: boolean;
  state?: boolean;
  features?: boolean;
  actions?: boolean;
}

export default function BreadCrumbs({
  storeName,
  stateKey,
  payload,
  state,
  features,
  actions,
}: Props) {
  return (
    <>
      <Button
        variant="none"
        disabled
        size="sm"
        className={`me-2 border-0 ${styles.compContainer}`}
      >
        <Crumb type={CrumbTypes.Store} label={storeName} />
        {stateKey ? <Crumb label={stateKey} /> : null}
        {state ? (
          <Crumb type={CrumbTypes.State} label={"State"} hideArrow />
        ) : null}
        {payload ? (
          <Crumb type={CrumbTypes.Payload} label={"Payload"} hideArrow />
        ) : null}
        {features ? (
          <Crumb type={CrumbTypes.Features} label={"Features"} hideArrow />
        ) : null}
        {actions ? (
          <Crumb type={CrumbTypes.Actions} label={"Actions"} hideArrow />
        ) : null}
      </Button>
    </>
  );
}
