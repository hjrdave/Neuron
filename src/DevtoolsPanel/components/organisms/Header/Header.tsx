import PanelPosition from "../../atoms/PanelPosition";
import NeuronLogo from "../../../assets/logo-neuron.webp";
import usePanel from "../../../hooks/usePanel";
import useCustomStyles from "../../../hooks/useCustomStyles";
import styles from "./Header.module.scss";

export default function Header() {
  const { customStyles } = useCustomStyles();
  const panel = usePanel();
  return (
    <div className={styles.compContainer} style={customStyles.header}>
      <img src={NeuronLogo} width={30} className={styles.logo} />
      <div className={styles.stackContainer}>
        <div className={styles.actionContainer}>
          <PanelPosition />
        </div>
        <i
          className={`fa-solid fa-minus ${styles.minifyIcon}`}
          onClick={panel.closePanel}
        ></i>
      </div>
    </div>
  );
}
