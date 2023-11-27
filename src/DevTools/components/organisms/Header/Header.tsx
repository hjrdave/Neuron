import React from "react";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MainNav from "../../molecules/MainNav";
import PositionRightIcon from "../../../assets/position-right.svg";
import PositionLeftIcon from "../../../assets/position-left.svg";
import PositionTopIcon from "../../../assets/position-top.svg";
import PositionBottomIcon from "../../../assets/position-bottom.svg";

export default function Header() {
  return (
    <Row className={"d-flex justify-content-between border-bottom"}>
      <Col className={"px-0"}>
        <MainNav />
      </Col>
      <Col sm={4} className={"d-flex align-items-center justify-content-end"}>
        <Image src={PositionRightIcon} width={"20rem"} className={"me-2"} />
        <Image src={PositionLeftIcon} width={"20rem"} className={"me-2"} />
        <Image src={PositionTopIcon} width={"20rem"} className={"me-2"} />
        <Image src={PositionBottomIcon} width={"20rem"} />
      </Col>
    </Row>
  );
}
