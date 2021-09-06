import React from "react";
import ReactDataGrid, { TextEditor, SelectColumn } from "react-data-grid";
import { useAppContext } from "../../contexts/AppContext";
import ExportToExcelButton from "../ExportToExcelButton";
import { formatMsg } from "../../utils/formatter";
import "./style.css";

export const DATA_STATUS = { CREATED: "created", DELETED: "deleted" };

const columns = [
  {
    key: "id",
    name: "ID",
    width: 40,
    exportColumn: true,
  },
  {
    key: "date",
    name: "日期",
    width: 80,
    editor: TextEditor,
    exportColumn: true,
  },
  {
    key: "name",
    name: "姓名",
    width: 80,
    editor: TextEditor,
    exportColumn: true,
  },
  {
    key: "tel",
    name: "電話",
    width: 120,
    editor: TextEditor,
    exportColumn: true,
  },
  {
    key: "msg",
    name: "訊息",
    editor: TextEditor,
    exportColumn: true,
    exportFormatter: formatMsg,
  },
];

const rowKeyGetter = (row) => row.id;

const CustomDataGrid = () => {
  const [selectedRows, setSelectedRows] = React.useState(new Set());
  const { dataArray, setDataArray } = useAppContext();

  const deleteSelectedRows = () => {
    if (selectedRows.size > 0) {
      setDataArray((prevState) =>
        prevState.map((row) =>
          selectedRows.has(row.id)
            ? {
                ...row,
                status: DATA_STATUS.DELETED,
              }
            : row
        )
      );
      setSelectedRows(new Set());
    }
  };

  return (
    <>
      <div className="DataGrid-header">
        <h3>已輸入資料</h3>
        <div className="DataGrid-actions">
          {selectedRows.size > 0 && (
            <button className="warnBtn" onClick={deleteSelectedRows}>
              刪除資料
            </button>
          )}
          <ExportToExcelButton columns={columns} rows={dataArray} />
        </div>
      </div>
      <ReactDataGrid
        columns={[SelectColumn, ...columns]}
        rows={dataArray.filter((row) => row.status === DATA_STATUS.CREATED)}
        onRowsChange={setDataArray}
        rowKeyGetter={rowKeyGetter}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
      />
    </>
  );
};

export default CustomDataGrid;
