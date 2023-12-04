import TopPanel from "./components/templates/TopPanel";
import BottomPanel from "./components/templates/BottomPanel";
import RightPanel from "./components/templates/RightPanel";
import LeftPanel from "./components/templates/LeftPanel";
import FloatingIcon from "./components/atoms/FloatingIcon";
import ConnectToApp from "./components/atoms/ConnectToApp";
import Store from "./Store";
import "./styles.scss";
import { CSSProperties } from "react";

interface Props {
  openPanel?: boolean;
  customStyles?: {
    floatingIcon?: CSSProperties;
  };
}
export default function DevTools({ openPanel, customStyles }: Props) {
  return (
    <>
      <Store />
      <TopPanel />
      <BottomPanel />
      <RightPanel />
      <LeftPanel />
      <FloatingIcon
        openPanel
        //customStyles={customStyles?.floatingIcon}
        //rightPanel
      />
    </>
  );
}
