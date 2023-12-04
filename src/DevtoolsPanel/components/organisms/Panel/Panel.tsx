import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import usePanel from "../../../hooks/usePanel";
import { PanelPositions } from "../../../Store";
import styles from "./Panel.module.scss";

interface Props {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
  children?: React.ReactNode;
}
export default function Panel({ children, top, bottom, right, left }: Props) {
  const panelPositionStyles = top
    ? styles.top
    : bottom
    ? styles.bottom
    : right
    ? styles.right
    : left
    ? styles.left
    : styles.right;
  return (
    <>
      <Card
        className={`${styles.compContainer} ${panelPositionStyles}`}
        data-bs-theme="dark"
      >
        <Card.Body className={styles.body}>
          <Container fluid>
            <Row>
              <Col>{children}</Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}
