import React from "react"
import { Col, Row } from "react-bootstrap"

import MainNav from "../../molecules/MainNav"
import SelectStore from "../../molecules/SelectStore"

export default function Header() {
  return (
    <Row className={"d-flex justify-content-between border-bottom"}>
      <Col className={"px-0"}>
        <MainNav />
      </Col>
      <Col sm={4} className={"px-0"}>
        <SelectStore />
      </Col>
    </Row>
  )
}
