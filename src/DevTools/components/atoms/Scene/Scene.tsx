import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export default function Scene({ children }: Props) {
  return (
    <>
      <Col style={{ height: "calc(100% - 40px)" }}>
        <Row className={"h-100"}>{children}</Row>
      </Col>
    </>
  );
}
