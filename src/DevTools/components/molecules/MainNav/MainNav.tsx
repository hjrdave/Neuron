import React from "react";
import { Nav } from "react-bootstrap";
import styles from "./MainNav.module.scss";

export default function MainNav() {
  const defaultTab = "inspect";

  return (
    <>
      <Nav
        variant="pills"
        defaultActiveKey={defaultTab}
        className={`${styles.compContainer} pb-0`}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="inspect"
            className={`${styles.navLink} text-white`}
          >
            Inspect
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link eventKey="settings" className={"text-white"}>
            Watch
          </Nav.Link>
        </Nav.Item> */}
      </Nav>
    </>
  );
}
