import useCustomStyles from "../../../hooks/useCustomStyles";
import styles from "./Crumb.module.scss";

export enum CrumbTypes {
  Store = "store",
  State = "state",
  Payload = "payload",
  Features = "features",
  Actions = "actions",
}

interface Props {
  type?: CrumbTypes;
  label: string;
  hideArrow?: boolean;
}
export default function Crumb({ label, type, hideArrow }: Props) {
  const { customStyles } = useCustomStyles();
  return (
    <>
      <span className={styles.compContainer} style={customStyles.crumb}>
        <i
          className={`fa-solid ${
            type === CrumbTypes.Store
              ? "fa-cubes"
              : type === CrumbTypes.State
              ? "fa-database"
              : type === CrumbTypes.Payload
              ? "fa-box-open"
              : type === CrumbTypes.Features
              ? "fa-gears"
              : CrumbTypes.Actions === type
              ? "fa-bolt"
              : "fa-cube"
          } ${styles.iconType}`}
        ></i>
        {label}
        {!hideArrow ? (
          <i className={`fa-solid fa-arrow-right-long ${styles.iconArrow}`}></i>
        ) : null}
      </span>
    </>
  );
}
