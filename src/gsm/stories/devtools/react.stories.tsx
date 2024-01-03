import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StoryFn, Meta } from "@storybook/react";
import DevtoolsPanel from "../../../devtools/DevtoolsPanel";

export default {
  title: "Tests/Devtools",
} as Meta;

const PanelTemplate: StoryFn = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <DevtoolsPanel />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export const Panel = PanelTemplate.bind({});
Panel.args = {};
