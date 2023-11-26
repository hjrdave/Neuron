import React from "react";
import { Accordion, Badge, ListGroup } from "react-bootstrap";

import ListItem from "../../atoms/ListItem";
import styles from "./StateList.module.scss";

interface Props {
  storeName: string;
  stateGroup: {
    key: string;
  }[];
}

export default function StateList({ storeName, stateGroup }: Props) {
  const [activeItem, setActiveItem] = React.useState<string>();
  return (
    <>
      <Accordion className={`${styles.stateList} border-bottom`}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className={"d-flex justify-content-between w-100"}>
              <span>
                <i className="fa-solid fa-cubes text-success pe-2"></i>
                {storeName}
              </span>
              <i className="fa-solid fa-angle-down text-white"></i>
            </div>
          </Accordion.Header>
          <Accordion.Body className={"p-0"}>
            <ListGroup>
              {stateGroup.map((state, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    label={state.key}
                    active={activeItem === state.key}
                    onClick={() => {
                      setActiveItem(state.key);
                    }}
                  />
                </React.Fragment>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
