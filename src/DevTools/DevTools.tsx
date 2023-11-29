import TopPanel from "./components/templates/TopPanel";
import BottomPanel from "./components/templates/BottomPanel";
import RightPanel from "./components/templates/RightPanel";
import LeftPanel from "./components/templates/LeftPanel";
import FloatingIcon from "./components/atoms/FloatingIcon";
import Store from "./Store";
import "./styles.scss";

export default function DevTools() {
  return (
    <>
      <Store />
      <TopPanel />
      <BottomPanel />
      <RightPanel />
      <LeftPanel />
      <FloatingIcon />
    </>
  );
}
