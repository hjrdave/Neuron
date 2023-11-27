import React from "react";
import Select from "react-select";

interface Props {}
export default function SelectStore({}: Props) {
  return (
    <>
      <div className={"selectStoreContainer"}>
        <Select
          options={[]}
          placeholder={"Select a Store"}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "black",
              border: "3px solid black",
              borderRadius: "0",
            }),
          }}
        />
      </div>
    </>
  );
}
