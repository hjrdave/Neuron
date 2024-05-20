import React, { Fragment } from "react";
import { useNeuron } from "./Grid.store";
import Row from "./Row";

export default function GridBody() {
  const [data] = useNeuron((state) => state.data);
  return (
    <>
      {data.map((item, index) => (
        <Fragment key={index}>
          <Row fieldData={item} />
        </Fragment>
      ))}
    </>
  );
}
