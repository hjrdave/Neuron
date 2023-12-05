import ThemeProvider from "react-bootstrap/ThemeProvider";
import FixedPanel from "./components/templates/FixedPanel";
import FloatingIcon from "./components/atoms/FloatingIcon";
import PanelOptions from "./components/atoms/PanelOptions";
import Store, { CustomStyles } from "./Store";
import "./styles.scss";

interface Props {
  openPanel?: boolean;
  customStyles?: CustomStyles;
  bottomPanel?: boolean;
  topPanel?: boolean;
  leftPanel?: boolean;
  rightPanel?: boolean;
}
export default function DevtoolsPanel({
  openPanel,
  customStyles,
  bottomPanel,
  topPanel,
  leftPanel,
  rightPanel,
}: Props) {
  return (
    <>
      <Store />
      <PanelOptions
        openPanel={openPanel}
        customStyles={customStyles}
        bottomPanel={bottomPanel}
        topPanel={topPanel}
        leftPanel={leftPanel}
        rightPanel={rightPanel}
      />
      {/* <ThemeProvider
        prefixes={{
          card: "ngsm-card",
          row: "ngsm-row",
          col: "ngsm-col",
          container: "ngsm-container",
          hstack: "ngsm-hstack",
          btn: "ngsm-btn",
        }}
      > */}
      <FixedPanel />
      <FloatingIcon />
      {/* </ThemeProvider> */}
    </>
  );
}
