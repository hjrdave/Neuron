import React from "react";
import Select, { SingleValue } from "react-select";

interface Props {
  placeHolder?: string;
  className?: string;
  options?: { label: string; value: any }[];
  onChange?: (option: SingleValue<{ label: string; value: string }>) => void;
  defaultValue?: string;
}
export default function SelectControl({
  placeHolder,
  className,
  options,
  onChange,
  defaultValue,
}: Props) {
  return (
    <>
      <Select
        defaultValue={
          defaultValue
            ? { label: defaultValue, value: defaultValue }
            : undefined
        }
        options={options}
        placeholder={placeHolder}
        className={className}
        onChange={onChange}
        isSearchable
        styles={{
          indicatorSeparator: () => ({
            border: "none",
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "black",
            border: "none",
            borderRadius: "0",
            boxShadow: "none",
            fontFamily: "Fira Code",
            fontSize: ".9rem",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: "white",
            fontFamily: "Fira Code",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#212529",
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            fontSize: ".9rem",
          }),
          singleValue: (baseStyles) => ({
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
            fontFamily: "Fira Code",
          }),
        }}
      />
    </>
  );
}
