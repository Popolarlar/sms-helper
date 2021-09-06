import React from "react";
import CreatableSelect from "react-select/creatable";
import { GROUP, groupedOptions } from "../../utils/options";
import { useAppContext } from "../../contexts/AppContext";
import { formatResultToString } from "../../utils/formatter";
import "./style.css";
import { DATA_STATUS } from "../CustomDataGrid";

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

const getTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#0081a7",
    primary75: "#00afb9",
    primary50: "#83c5be",
    primary25: "#bee1e6",
  },
});

const formatCreateLabel = (inputValue) => `直接輸入 ${inputValue}`;

const formatOptionLabel = (option, { context, inputValue, selectValue }) => {
  if (context === "menu") {
    return `${option.value} - ${option.label}`;
  }

  return option.label;
};

function CustomInput() {
  const { inputArray, setInputArray, dataArray, setDataArray } =
    useAppContext();

  const handleChange = (_, { action, option, removedValue }) => {
    switch (action) {
      case "select-option":
      case "create-option":
        setInputArray((prevState) => [
          ...prevState,
          { ...option, id: Date.now() },
        ]);
        break;

      case "deselect-option":
      case "remove-value":
        setInputArray((prevState) =>
          prevState.filter((o) => o.id !== removedValue.id)
        );
        break;

      case "pop-value":
        setInputArray((prevState) => prevState.slice(0, -1));
        break;

      case "clear":
        setInputArray([]);
        break;
      default:
        break;
    }
  };

  const clearInputArray = () => setInputArray([]);

  const createData = () =>
    setDataArray((prevState) => [
      ...prevState,
      {
        id: dataArray.length + 1,
        date: "",
        name: "",
        tel: "",
        msg: formatResultToString(inputArray),
        status: DATA_STATUS.CREATED,
      },
    ]);

  return (
    <div className="CustomInput">
      <div>
        <h3>輸入：</h3>
        <span className="CustomInput-note">R/診斷、S/處置</span>
      </div>

      <CreatableSelect
        autoFocus
        isMulti
        components={components}
        placeholder="請輸入代號或直接輸入文字.."
        options={groupedOptions}
        styles={styles}
        theme={getTheme}
        maxMenuHeight={500}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        getNewOptionData={getNewOptionData}
        formatCreateLabel={formatCreateLabel}
        formatOptionLabel={formatOptionLabel}
        value={inputArray}
        onChange={handleChange}
      />

      <h3>結果：</h3>
      <div className="CustomInput-result">
        <p className="CustomInput-preview">
          {formatResultToString(inputArray)}
        </p>

        <button className="warnBtn" onClick={clearInputArray}>
          清除
        </button>
        <button className="primaryBtn" onClick={createData}>
          加入
        </button>
      </div>
    </div>
  );
}

export default CustomInput;
