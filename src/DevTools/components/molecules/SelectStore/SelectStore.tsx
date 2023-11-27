import React from "react";
import Select from "react-select";

interface Props {
  placeHolder?: string;
  className?: string;
}
export default function SelectStore({ placeHolder, className }: Props) {
  return (
    <>
      <div className={"selectStoreContainer"}>
        <Select
          options={[]}
          placeholder={placeHolder}
          className={className}
          styles={{
            indicatorSeparator: () => ({
              border: "none",
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "black",
              border: "none",
              borderRadius: "0",
            }),
          }}
        />
      </div>
    </>
  );
}
