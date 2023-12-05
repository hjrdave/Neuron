import { PanelPositions, useNeuron } from "../Store";

const usePanel = () => {
  const [position, setPosition] = useNeuron(
    (state) => state.devtools_panelPosition
  );
  const [open, setOpen] = useNeuron<boolean>("devtools_openPanel");
  const attachRight = () => setPosition(PanelPositions.Right);
  const attachLeft = () => setPosition(PanelPositions.Left);
  const attachTop = () => setPosition(PanelPositions.Top);
  const attachBottom = () => setPosition(PanelPositions.Bottom);
  const closePanel = () => setOpen(false);
  const openPanel = () => setOpen(true);
  const isStacked =
    position === PanelPositions.Right || position === PanelPositions.Left;

  return {
    position,
    attachRight,
    attachLeft,
    attachBottom,
    attachTop,
    closePanel,
    openPanel,
    open,
    isStacked,
  };
};

export default usePanel;
