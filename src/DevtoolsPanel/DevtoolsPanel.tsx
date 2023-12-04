import FixedPanel from "./components/templates/FixedPanel";
import FloatingIcon from "./components/atoms/FloatingIcon";
import Store from "./Store";
import "./styles.scss";
import { CSSProperties } from "react";

interface Props {
  openPanel?: boolean;
  customStyles?: {
    floatingIcon?: CSSProperties;
  };
}
export default function DevtoolsPanel({ openPanel, customStyles }: Props) {
  return (
    <>
      <Store />
      <FixedPanel />
      <FloatingIcon openPanel />
    </>
  );
}
