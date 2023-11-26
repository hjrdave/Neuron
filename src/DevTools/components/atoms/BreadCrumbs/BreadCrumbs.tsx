import React from "react"
import { Button } from "react-bootstrap"

interface Props {
  storeName: string
  stateKey?: string
  payload?: boolean
  state?: boolean
  features?: boolean
  actions?: boolean
}

export default function BreadCrumbs({
  storeName,
  stateKey,
  payload,
  state,
  features,
  actions
}: Props) {
  return (
    <>
      <Button variant="none" disabled size="sm" className={"me-2 viewerTitle"}>
        <i className="fa-solid fa-cubes text-success pe-2"></i>
        <span className={"text-white"}>{storeName}</span>
        {stateKey ? (
          <>
            <span className={"text-white px-3"}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </span>
            <i className="fa-solid fa-cube text-success pe-2"></i>
            <span className={"text-white"}>{stateKey}</span>
          </>
        ) : null}
        {state ? (
          <>
            <span className={"text-white px-3"}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </span>
            <i className="fa-solid fa-database text-success pe-2"></i>
            <span className={"text-white"}>State</span>
          </>
        ) : null}
        {payload ? (
          <>
            <span className={"text-white px-3"}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </span>
            <i className="fa-solid fa-box-open text-success pe-2"></i>
            <span className={"text-white"}>Payload</span>
          </>
        ) : null}
        {features ? (
          <>
            <span className={"text-white px-3"}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </span>
            <i className="fa-solid fa-gears text-success pe-2"></i>
            <span className={"text-white"}>Features</span>
          </>
        ) : null}
        {actions ? (
          <>
            <span className={"text-white px-3"}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </span>
            <i className="fa-solid fa-bolt text-success pe-2"></i>
            <span className={"text-white"}>Actions</span>
          </>
        ) : null}
        {/**payload, state, features, actions */}
      </Button>
    </>
  )
}
