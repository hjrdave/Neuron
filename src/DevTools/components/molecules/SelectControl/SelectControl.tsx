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
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "black",
            border: "none",
            borderRadius: "0",
            boxShadow: "none",
          }),
          input: (baseStyles, state) => ({
            ...baseStyles,
            color: "white",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#212529",
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            fontSize: ".9rem",
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: "white",
            fontSize: ".9rem",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected
              ? "#57c09b"
              : state.isFocused
              ? "#212529"
              : "#212529",
            cursor: "pointer",
          }),
        }}
      />
    </>
  );
}
