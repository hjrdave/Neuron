import React from "react";
import Select from "react-select";

interface Props {
  placeHolder?: string;
  className?: string;
  options?: { label: string; value: any }[];
}
export default function SelectControl({
  placeHolder,
  className,
  options,
}: Props) {
  return (
    <>
      <Select
        options={options}
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
          input: (baseStyles) => ({
            ...baseStyles,
            color: "white",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#212529",
          }),
        }}
      />
    </>
  );
}
