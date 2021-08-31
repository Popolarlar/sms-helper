import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { GROUP, groupedOptions } from "./constants/options";

const groupColors = {
  [GROUP.SYMBOL]: "#e5e5e5",
  [GROUP.NEW]: "#e5e5e5",
  [GROUP.HELPER]: "#e5e5e5",
  [GROUP.TEST]: "#e9edc9",
  [GROUP.RESULT]: "#dfe7fd",
  [GROUP.SUGGESTION]: "#f9dcc4",
};

const components = {
  DropdownIndicator: null,
};

const styles = {
  menu: (styles) => ({
    ...styles,
  }),

  multiValue: (styles, { data }) => {
    const backgroundColor = groupColors[data.group];

    return { ...styles, backgroundColor };
  },
};

const getOptionLabel = (option) => {
  return `${option.value} - ${option.label}`;
};

const getOptionValue = (option) => {
  return option.group === GROUP.TEST ? option.value : option.id;
};

const getNewOptionData = (inputValue, optionLabel) => ({
  label: optionLabel,
  value: inputValue,
  group: GROUP.NEW,
});

const formatCreateLabel = (inputValue) => `直接輸入 ${inputValue}`;

const formatOptionLabel = (option, { context, inputValue, selectValue }) => {
  if (context === "menu") {
    return `${option.value} - ${option.label}`;
  }

  return option.label;
};

function CustomSelector({ result, setResult }) {
  const handleChange = (_, { action, option, removedValue }) => {
    switch (action) {
      case "select-option":
      case "create-option":
        setResult((prevState) => [...prevState, { ...option, id: Date.now() }]);
        break;

      case "deselect-option":
      case "remove-value":
        setResult((prevState) =>
          prevState.filter((o) => o.id !== removedValue.id)
        );
        break;

      case "pop-value":
        setResult((prevState) => prevState.slice(0, -1));
        break;

      case "clear":
        setResult([]);
        break;
      default:
        break;
    }
  };

  return (
    <CreatableSelect
      autoFocus
      isMulti
      components={components}
      placeholder="請輸入代號或直接輸入文字.."
      options={groupedOptions}
      styles={styles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#0081a7",
          primary75: "#00afb9",
          primary50: "#83c5be",
          primary25: "#bee1e6",
        },
      })}
      minMenuHeight={300}
      maxMenuHeight={600}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      getNewOptionData={getNewOptionData}
      formatCreateLabel={formatCreateLabel}
      formatOptionLabel={formatOptionLabel}
      value={result}
      onChange={handleChange}
    />
  );
}

export default CustomSelector;
