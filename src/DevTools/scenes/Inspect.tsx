import React from "react";
import Col from "react-bootstrap/Col";
import Scene from "../components/atoms/Scene";
import StateViewer from "../components/organisms/StateViewer";

interface Props {}

export default function Inspect({}: Props) {
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
