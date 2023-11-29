import { useNeuron } from "../Store";
import { PanelPositions } from "../Store";

const usePanelPosition = () => {
  const [position, setPosition] = useNeuron((state) => state.panelPosition);
  const [open, setOpen] = useNeuron((state) => state.openPanel);
  const attachRight = () => setPosition(PanelPositions.Right);
  const attachLeft = () => setPosition(PanelPositions.Left);
  const attachTop = () => setPosition(PanelPositions.Top);
  const attachBottom = () => setPosition(PanelPositions.Bottom);
  const closePanel = () => setOpen(false);
  const openPanel = () => setOpen(true);

  return {
    position,
    attachRight,
    attachLeft,
    attachBottom,
    attachTop,
    closePanel,
    openPanel,
    open,
  };
};

export default usePanelPosition;
