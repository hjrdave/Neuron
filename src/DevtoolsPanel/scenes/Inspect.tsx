import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Scene from "../components/atoms/Scene";
import StateViewer from "../components/molecules/StateViewer";
import BreadCrumbs from "../components/molecules/BreadCrumbs";
import StateSelectors from "../components/molecules/StateSelectors";
import usePanel from "../hooks/usePanel";
import { PanelPositions } from "../Store";
import { useNeuron, getState, onDispatch } from "../Store";
import styles from "./Inspect.module.scss";

export default function Inspect() {
  const panel = usePanel();
  const [showStoreControls, setShowStoreControls] = React.useState(false);
  const isStacked =
    panel.position === PanelPositions.Right ||
    panel.position === PanelPositions.Left;

  const [storeList] = useNeuron<string[]>("storeList");
  const [keyList] = useNeuron<string[]>("keyList");
  const [selectedStore, setSelectedStore] = useNeuron<string>("selectedStore");
  const [selectedKey, setSelectedKey] = useNeuron<string>("selectedKey");
  const [selectedType, setSelectedType] = useNeuron<string>("selectedType");

  const [storeData, setStoreData] = React.useState({});

  React.useEffect(() => {
    onDispatch((payload) => {
      const newState = payload.state?.[selectedKey]?.[selectedType];
      if (newState !== undefined) {
        setStoreData(newState);
      }
    });
  }, [selectedKey, selectedType]);

  React.useEffect(() => {
    if (selectedStore && selectedKey) {
      const dynamicStoreData = getState(selectedStore as any)?.[selectedKey]?.[
        selectedType
      ];
      if (dynamicStoreData) {
        setStoreData(dynamicStoreData);
      }
    }
  }, [selectedStore, selectedKey, selectedType]);

  return (
    <>
      <Scene>
        <Col>
          <Row className={`${isStacked ? styles.reverseRow : ""}`}>
            <Col
              sm={12}
              lg={isStacked ? 12 : 5}
              className={styles.breadCrumbContainer}
            >
              <BreadCrumbs
                storeName={selectedStore}
                stateKey={selectedKey}
                stateType={selectedType as any}
              />
            </Col>
            <Col sm={isStacked ? 12 : 7}>
              {isStacked ? (
                <Row>
                  <Col
                    className={styles.selectorElipsisMenu}
                    onClick={() =>
                      setShowStoreControls(showStoreControls ? false : true)
                    }
                  >
                    <i className={`fa-solid fa-ellipsis`}></i>
                  </Col>
                </Row>
              ) : null}
              {!isStacked || showStoreControls ? (
                <Row>
                  <Col className={styles.stateSelectorContainer}>
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
                  </Col>
                </Row>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col className={styles.stateViewerContainer}>
              {selectedStore && selectedKey && selectedType ? (
                <StateViewer
                  storeData={storeData}
                  selectedStore={selectedStore}
                  selectedKey={selectedKey}
                  selectedType={selectedType}
                />
              ) : (
                <p style={{ marginBottom: "0rem" }}>
                  <small>Nothing is selected.</small>
                </p>
              )}
            </Col>
          </Row>
        </Col>
      </Scene>
    </>
  );
}
