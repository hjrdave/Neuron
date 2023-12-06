import React from "react";
import Crumb, { CrumbTypes } from "../../atoms/Crumb";
import useCustomStyles from "../../../hooks/useCustomStyles";

interface Props {
  storeName: string;
  stateKey?: string;
  stateType?: "state" | "features" | "actions" | "payload";
}

export default function BreadCrumbs({ storeName, stateKey, stateType }: Props) {
  const { customStyles } = useCustomStyles();
  return (
    <>
      <div style={customStyles.breadCrumbs}>
        {storeName ? (
          <>
            <Crumb type={CrumbTypes.Store} label={storeName} />
            {stateKey ? <Crumb label={stateKey} /> : null}
            {stateType === "state" ? (
              <Crumb type={CrumbTypes.State} label={"state"} hideArrow />
            ) : null}
            {stateType === "payload" ? (
              <Crumb type={CrumbTypes.Payload} label={"payload"} hideArrow />
            ) : null}
            {stateType === "features" ? (
              <Crumb type={CrumbTypes.Features} label={"features"} hideArrow />
            ) : null}
            {stateType === "actions" ? (
              <Crumb type={CrumbTypes.Actions} label={"actions"} hideArrow />
            ) : null}
          </>
        ) : (
          "Please select a store."
        )}
      </div>
    </>
  );
}
