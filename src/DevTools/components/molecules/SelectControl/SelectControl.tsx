import React from "react";
import Select from "react-select";

interface Props {
  placeHolder?: string;
  className?: string;
}
export default function SelectControl({ placeHolder, className }: Props) {
  return (
    <>
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
    </>
  );
}
