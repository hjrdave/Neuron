import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "./MainNav.module.scss";

export default function MainNav() {
  const defaultTab = "inspect";
  // const navigate = useNavigate()
  React.useEffect(() => {
    //navigate(defaultTab)
  }, []);
  return (
    <>
      <Nav
        variant="pills"
        defaultActiveKey={defaultTab}
        className={`${styles.navContainer} pb-0`}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="inspect"
            className={"text-white"}
            // onClick={() => navigate("inspect")}
          >
            Inspect
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="settings"
            className={"text-white"}
            //onClick={() => navigate("settings")}
          >
            Watch
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
