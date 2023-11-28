import React from "react";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MainNav from "../../molecules/MainNav";
import PanelPosition from "../../atoms/PanelPosition";
import NeuronLogo from "../../../assets/logo-neuron.webp";

export default function Header() {
  return (
    <Row className={"d-flex justify-content-between border-bottom"}>
      <Col className={"px-0"}>
        <div className={"d-flex"}>
          <div className={"py-2 px-3"}>
            <Image src={NeuronLogo} width={30} />
          </div>
          <div className={"d-flex align-items-end"}>
            <MainNav />
          </div>
        </div>
      </Col>
      <Col sm={4} className={"d-none d-sm-block"}>
        <PanelPosition />
      </Col>
    </Row>
  );
}
