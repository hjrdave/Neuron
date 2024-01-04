import LogoNeuron from "../../../assets/logo-neuron.webp";
import usePanel from "../../../hooks/usePanel";
import useCustomStyles from "../../../hooks/useCustomStyles";
import compStyles from "./FloatingIcon.module.scss";

export default function FloatingIcon() {
  const { customStyles } = useCustomStyles();
  const panel = usePanel();

  return (
    <>
      <div
        className={`${compStyles.compContainer} ${
          panel.open ? compStyles.hide : ""
        }`}
        style={customStyles.floatingIcon}
        onClick={panel.openPanel}
      >
        <img src={LogoNeuron} className={compStyles.logo} />
      </div>
    </>
  );
}
