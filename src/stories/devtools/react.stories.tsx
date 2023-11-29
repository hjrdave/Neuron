import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StoryFn, Meta } from "@storybook/react";
import DevTools from "../../DevTools";

export default {
  title: "Tests/Devtools",
} as Meta;

const PanelTemplate: StoryFn = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <DevTools
              openPanel
              customStyles={
                {
                  //floatingIcon: { backgroundColor: "blue!important" },
                }
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export const Panel = PanelTemplate.bind({});
Panel.args = {};
