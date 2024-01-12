import { useEffect } from "react";
import useCustomStyles from "../../hooks/useCustomStyles";
import usePanel from "../../hooks/usePanel";
import { CustomStyles } from "../../Store";

interface Props {
  openPanel?: boolean;
  customStyles?: CustomStyles;
  bottomPanel?: boolean;
  topPanel?: boolean;
  leftPanel?: boolean;
  rightPanel?: boolean;
}
export default function PanelOptions({
  openPanel,
  customStyles,
  bottomPanel,
  topPanel,
  leftPanel,
  rightPanel,
}: Props) {
  const { setCustomStyles } = useCustomStyles();
  const panel = usePanel();
  const defaultPanelState = () => (openPanel ? panel.openPanel() : null);
  const defaultPanelPosition = () => {
    bottomPanel
      ? panel.attachBottom()
      : topPanel
      ? panel.attachTop()
      : leftPanel
      ? panel.attachLeft()
      : rightPanel
      ? panel.attachRight()
      : panel.attachTop();
  };
  useEffect(() => {
    defaultPanelState();
    defaultPanelPosition();
  }, []);
  customStyles ? setCustomStyles(customStyles) : null;
  return null;
}
