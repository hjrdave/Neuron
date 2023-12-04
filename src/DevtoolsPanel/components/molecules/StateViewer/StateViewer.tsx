import React from "react";
import ReactJson from "react-json-view";

interface Props {
  selectedStore?: string;
  selectedType?: string;
  selectedKey?: string;
  storeData: any;
}
export default function StateViewer({
  selectedType,
  storeData,
  selectedKey,
}: Props) {
  return (
    <>
      <ReactJson
        name={selectedType}
        src={
          selectedType !== "state"
            ? storeData
            : { [selectedKey ?? ""]: storeData }
        }
        theme="monokai"
        enableClipboard
        displayDataTypes={false}
        displayObjectSize={false}
        style={{
          backgroundColor: "black",
          fontSize: ".8rem",
        }}
      />
    </>
  );
}
