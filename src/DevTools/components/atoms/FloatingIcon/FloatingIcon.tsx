import { useEffect, CSSProperties } from "react";
import LogoNeuron from "../../../assets/logo-neuron.webp";
import { PanelPositions } from "../../../Store";
import usePanel from "../../../hooks/usePanel";
import compStyles from "./FloatingIcon.module.scss";

interface Props {
  openPanel?: boolean;
  panelPosition?: PanelPositions;
  topPanel?: boolean;
  bottomPanel?: boolean;
  rightPanel?: boolean;
  leftPanel?: boolean;
  styles?: CSSProperties;
}
export default function FloatingIcon({
  openPanel,
  styles,
  topPanel,
  bottomPanel,
  rightPanel,
  leftPanel,
}: Props) {
  const panelPosition = usePanel();
  const defaultPanelOpenState = () => {
    if (openPanel) {
      panelPosition.openPanel();
    }
  };
  const defaultPanelPosition = () => {
    bottomPanel
      ? panelPosition.attachBottom()
      : topPanel
      ? panelPosition.attachTop()
      : leftPanel
      ? panelPosition.attachLeft()
      : rightPanel
      ? panelPosition.attachRight()
      : panelPosition.attachTop();
  };
  useEffect(() => {
    defaultPanelOpenState();
    defaultPanelPosition();
  }, []);
  return (
    <>
      <div
        className={`${compStyles.compContainer} ${
          panelPosition.open ? compStyles.hide : ""
        }`}
        style={styles}
        onClick={panelPosition.openPanel}
      >
        <img src={LogoNeuron} className={compStyles.logo} />
      </div>
    </>
  );
}
