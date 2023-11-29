import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Header from "../organisms/Header";
import Inspect from "../../scenes/Inspect";
import { PanelPositions } from "../../Store";
import usePanelPosition from "../../hooks/usePanelPosition";

export default function TopPanel() {
  const panelPosition = usePanelPosition();
  return (
    <>
      {panelPosition.position === PanelPositions.Top && panelPosition.open ? (
        <Container className={`p-1 z-3 position-fixed top-0`}>
          <Row>
            <Col>
              <Card
                className={"shadow"}
                data-bs-theme="dark"
                style={{ borderRadius: ".25rem" }}
              >
                <Card.Body className={"p-0"}>
                  <Container fluid>
                    <Row>
                      <Col>
                        <Header />
                        <Inspect />
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : null}
    </>
  );
}
