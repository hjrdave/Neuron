import React from "react";
import Stack from "react-bootstrap/esm/Stack";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PanelPosition from "../../atoms/PanelPosition";
import NeuronLogo from "../../../assets/logo-neuron.webp";
import usePanel from "../../../hooks/usePanel";
import useCustomStyles from "../../../hooks/useCustomStyles";
import styles from "./Header.module.scss";

export default function Header() {
  const { customStyles } = useCustomStyles();
  const panel = usePanel();
  return (
    <Row className={styles.compContainer} styles={customStyles.header}>
      <Col md={4}>
        <Stack gap={3} direction={"horizontal"}>
          <img src={NeuronLogo} width={30} className={styles.logo} />
        </Stack>
      </Col>
      <Col md={8}>
        <Stack gap={1} direction="horizontal" className={styles.stackContainer}>
          <div className={styles.actionContainer}>
            <PanelPosition />
          </div>
          <i
            className={`fa-solid fa-minus ${styles.minifyIcon}`}
            onClick={panel.closePanel}
          ></i>
        </Stack>
      </Col>
    </Row>
  );
}
