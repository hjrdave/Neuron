import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BreadCrumbs from "../../molecules/BreadCrumbs";
import ReactJson from "react-json-view";
import SelectControl from "../../molecules/SelectControl";
import usePanelPosition from "../../../hooks/usePanelPosition";
import { PanelPositions } from "../../../Store";

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

  const { position } = usePanelPosition();
  const isStacked =
    position === PanelPositions.Right || position === PanelPositions.Left;

  return (
    <>
      <Row className={"m-0 flex-lg-row-reverse"}>
        <Col className={"bg-black"} sm={isStacked ? 12 : 7}>
          <Row>
            <Col
              sm={12}
              md={isStacked ? 12 : 4}
              className={"p-0 border-bottom border-start"}
            >
              <SelectControl placeHolder="Store" />
            </Col>
            <Col
              sm={12}
              md={isStacked ? 12 : 4}
              className={"p-0 border-bottom border-start"}
            >
              <SelectControl placeHolder="State" />
            </Col>
            <Col
              sm={12}
              md={isStacked ? 12 : 4}
              className={"ps-0 pe-0 border-bottom border-start"}
            >
              <SelectControl placeHolder="Type" />
            </Col>
          </Row>
        </Col>
        <Col
          sm={12}
          lg={isStacked ? 12 : 5}
          className={"d-flex align-items-center p-0 bg-black border-bottom"}
        >
          <BreadCrumbs storeName={storeName} {...breadCrumbProps} />
        </Col>
      </Row>
      <Row className={"m-0"}>
        <Col
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
