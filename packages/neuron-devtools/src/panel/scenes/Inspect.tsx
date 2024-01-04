import React from "react";
import StateViewer from "../components/molecules/StateViewer";
import BreadCrumbs from "../components/molecules/BreadCrumbs";
import StateSelectors from "../components/molecules/StateSelectors";
import usePanel from "../hooks/usePanel";
import { PanelPositions } from "../Store";
import { useNeuron, useWeakNeuron } from "../Store";
import styles from "./Inspect.module.scss";

export default function Inspect() {
  const panel = usePanel();
  const [showStoreControls, setShowStoreControls] = React.useState(false);
  const isStacked =
    panel.position === PanelPositions.Right ||
    panel.position === PanelPositions.Left;

  const [storeList] = useNeuron<string[]>("devtools_storeList");
  const [keyList] = useNeuron<string[]>("devtools_keyList");
  const [selectedStore, setSelectedStore] = useNeuron<string>(
    "devtools_selectedStore"
  );
  const [selectedKey, setSelectedKey] = useNeuron<string>(
    "devtools_selectedKey"
  );
  const [selectedType, setSelectedType] = useNeuron<string>(
    "devtools_selectedType"
  );
  const [dynamicState] = useWeakNeuron(selectedStore);

  return (
    <>
      <div className={`${isStacked ? styles.reverseRow : styles.row}`}>
        <div
          className={`${styles.breadCrumbContainer} ${
            !isStacked ? styles["w-40"] : ""
          }`}
        >
          <BreadCrumbs
            storeName={selectedStore}
            stateKey={selectedKey}
            stateType={selectedType as any}
          />
        </div>
        <div
          className={`${styles.stateSelectorContainer} ${
            !isStacked ? styles["w-60"] : ""
          }`}
        >
          {isStacked ? (
            <div
              className={styles.selectorElipsisMenu}
              onClick={() =>
                setShowStoreControls(showStoreControls ? false : true)
              }
            >
              <i className={`fa-solid fa-ellipsis`}></i>
            </div>
          ) : null}
          {!isStacked || showStoreControls ? (
            <StateSelectors
              stacked={isStacked}
              storeOptions={storeList}
              keyOptions={keyList}
              onStoreChange={setSelectedStore}
              onKeyChange={setSelectedKey}
              onTypeChange={setSelectedType as any}
              selectedStore={selectedStore}
              selectedKey={selectedKey}
              selectedType={selectedType}
            />
          ) : null}
        </div>
      </div>
      <div className={styles.stateViewerContainer}>
        <StateViewer
          storeData={dynamicState?.[selectedKey]?.[selectedType]}
          selectedStore={selectedStore}
          selectedKey={selectedKey}
          selectedType={selectedType}
        />
      </div>
    </>
  );
}
