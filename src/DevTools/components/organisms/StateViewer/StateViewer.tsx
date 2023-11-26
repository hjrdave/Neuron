import React from "react";
import { Button } from "react-bootstrap";

import BreadCrumbs from "../../atoms/BreadCrumbs";
import ViewerTabs, { TabNames } from "../../atoms/ViewerTabs";
import styles from "./StateViewer.module.scss";

interface Props {
  stateKey: string;
  storeName: string;
}

export default function StateViewer({ stateKey, storeName }: Props) {
  const [breadCrumbProps, setBreadCrumbProps] = React.useState<{
    stateKey?: string;
    state?: boolean;
    payload?: boolean;
    features?: boolean;
    actions?: boolean;
  }>({ stateKey: stateKey, state: true });
  const handleBreadCrumbs = (activeTab: TabNames) => {
    let props = {
      stateKey: stateKey,
      state: activeTab === TabNames.State,
      payload: activeTab === TabNames.Payload,
      features: activeTab === TabNames.Features,
      actions: activeTab === TabNames.Actions,
    };
    setBreadCrumbProps(props);
  };
  return (
    <>
      <div
        className={
          "d-flex justify-content-start bg-dark p-2 border-start border-bottom"
        }
      >
        <BreadCrumbs storeName={storeName} {...breadCrumbProps} />
      </div>
      <div
        className={
          "d-flex align-items-center justify-content-between bg-dark p-2 border-start border-bottom"
        }
      >
        <div className={"pe-3"}>
          <Button variant="outline-secondary" size="sm" className={"me-2"}>
            Tree
          </Button>
          <Button variant="outline-secondary" size="sm" className={"me-2"}>
            Raw
          </Button>
        </div>
        <ViewerTabs onChange={handleBreadCrumbs} />
      </div>
      <div className={`p-3 bg-black border-start ${styles.stateViewer}`}>
        <p className={"text-white"}>state</p>
      </div>
    </>
  );
}
