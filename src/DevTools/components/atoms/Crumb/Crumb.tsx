import React from "react";

export enum CrumbTypes {
  Store = "store",
  State = "state",
  Payload = "payload",
  Features = "features",
  Actions = "actions",
}

interface Props {
  type?: CrumbTypes;
  label: string;
  hideArrow?: boolean;
}
export default function Crumb({ label, type, hideArrow }: Props) {
  return (
    <>
      <span className={"text-white px-2"}>
        <i
          className={`fa-solid ${
            type === CrumbTypes.Store
              ? "fa-cubes"
              : type === CrumbTypes.State
              ? "fa-database"
              : type === CrumbTypes.Payload
              ? "fa-box-open"
              : type === CrumbTypes.Features
              ? "fa-gears"
              : CrumbTypes.Actions === type
              ? "fa-bolt"
              : "fa-cube"
          } text-success pe-2`}
        ></i>
        {label}
        {!hideArrow ? (
          <i className="ps-2 fa-solid fa-arrow-right-long"></i>
        ) : null}
      </span>
    </>
  );
}
