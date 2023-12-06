import React from "react";
import useCustomStyles from "../../../hooks/useCustomStyles";
import styles from "./Panel.module.scss";

interface Props {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
  children?: React.ReactNode;
}
export default function Panel({ children, top, bottom, right, left }: Props) {
  const { customStyles } = useCustomStyles();
  const currentPosition = top
    ? "top"
    : bottom
    ? "bottom"
    : right
    ? "right"
    : left
    ? "left"
    : "right";

  const panelCustomStyles = {
    ...customStyles.panel,
    ...customStyles[`${currentPosition}Panel`],
  };

  return (
    <>
      <div
        className={`${styles.compContainer} ${styles[currentPosition]}`}
        style={panelCustomStyles}
      >
        {children}
      </div>
    </>
  );
}
