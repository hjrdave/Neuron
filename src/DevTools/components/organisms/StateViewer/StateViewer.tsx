import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CrumbTypes } from "../../atoms/Crumb";
import BreadCrumbs from "../../molecules/BreadCrumbs";
import ViewerTabs from "../../molecules/ViewerTabs";
import ReactJson from "react-json-view";
import SelectStore from "../../molecules/SelectStore";
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
  const handleBreadCrumbs = (activeTab: CrumbTypes) => {
    let props = {
      stateKey: stateKey,
      state: activeTab === CrumbTypes.State,
      payload: activeTab === CrumbTypes.Payload,
      features: activeTab === CrumbTypes.Features,
      actions: activeTab === CrumbTypes.Actions,
    };
    setBreadCrumbProps(props);
  };
  return (
    <>
      <Row className={"m-0"}>
        <Col
          sm={5}
          className={"d-flex align-items-center p-0 bg-black border-bottom"}
        >
          <BreadCrumbs storeName={storeName} {...breadCrumbProps} />
        </Col>
        <Col className={"bg-black"}>
          <Row>
            <Col className={"p-0 border-bottom border-start"}>
              <SelectStore placeHolder="Store" />
            </Col>
            <Col className={"p-0 border-bottom border-start"}>
              <SelectStore placeHolder="State" />
            </Col>

            <Col className={"ps-0 pe-0 border-bottom border-start"}>
              <SelectStore placeHolder="Type" />
            </Col>
          </Row>
        </Col>
        <Col
          sm={12}
          className={"bg-black p-3"}
          style={{ borderRadius: "0px 0px .25rem .25rem" }}
        >
          <ReactJson
            name={"fruit"}
            src={["foo", "fee"]}
            theme="monokai"
            enableClipboard
            displayDataTypes={false}
            displayObjectSize={false}
            style={{
              backgroundColor: "black",
              fontSize: ".85rem",
            }}
          />
        </Col>
      </Row>
    </>
  );
}
