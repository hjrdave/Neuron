import React from "react";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MainNav from "../../molecules/MainNav";
import PanelPosition from "../../atoms/PanelPosition";

export default function Header() {
  return (
    <Row className={"d-flex justify-content-between border-bottom"}>
      <Col className={"px-0"}>
        <MainNav />
      </Col>
      <Col sm={4} className={"d-none d-sm-block"}>
        <PanelPosition />
      </Col>
    </Row>
  );
}
