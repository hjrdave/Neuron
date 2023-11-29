import React from "react";
import Col from "react-bootstrap/Col";
import Scene from "../components/atoms/Scene";
import StateViewer from "../components/organisms/StateViewer";

export default function Inspect() {
  return (
    <>
      <Scene>
        <Col className={"p-0"}>
          <StateViewer storeName="Store 1" stateKey="fruit" />
        </Col>
      </Scene>
    </>
  );
}
