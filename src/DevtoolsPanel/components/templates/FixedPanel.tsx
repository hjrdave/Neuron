import React from "react";
import Header from "../organisms/Header";
import Inspect from "../../scenes/Inspect";
import Panel from "../organisms/Panel";
import usePanel from "../../hooks/usePanel";

export default function BottomPanel() {
  const { position, open } = usePanel();
  return (
    <>
      {open ? (
        <Panel
          left={position === "left"}
          right={position === "right"}
          top={position === "top"}
          bottom={position === "bottom"}
        >
          <Header />
          <Inspect />
        </Panel>
      ) : null}
    </>
  );
}
