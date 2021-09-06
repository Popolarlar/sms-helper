import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportToExcelButton = ({
  columns,
  rows,
  fileName = `享悅診所-門診檢驗結果${new Date().toLocaleDateString()}`,
  sheetName = "檢驗簡訊",
}) => {
  return (
    <ExcelFile filename={fileName} element={<button>匯出資料</button>}>
      <ExcelSheet data={rows} name={sheetName}>
        {columns
          .filter((col) => col.exportColumn)
          .map((col) => {
            const { name, key, exportFormatter } = col;
            return (
              <ExcelColumn
                key={key}
                label={name}
                value={(row) =>
                  exportFormatter ? exportFormatter(row) : row[key]
                }
              />
            );
          })}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportToExcelButton;
