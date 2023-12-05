import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import useCustomStyles from "../../../hooks/useCustomStyles";
import styles from "./Panel.module.scss";

interface Props {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
  children?: React.ReactNode;
}
export default function Panel({ children, top, bottom, right, left }: Props) {
  const { customStyles } = useCustomStyles();
  const currentPosition = top
    ? "top"
    : bottom
    ? "bottom"
    : right
    ? "right"
    : left
    ? "left"
    : "right";

  const panelCustomStyles = {
    ...customStyles.panel,
    ...customStyles[`${currentPosition}Panel`],
  };

  return (
    <>
      <Card
        className={`${styles.compContainer} ${styles[currentPosition]}`}
        style={panelCustomStyles}
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
