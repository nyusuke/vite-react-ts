import { DateTime } from "luxon";
import type { ProcessCellForExportParams } from "ag-grid-community";

const dateTimeCellCallback = (params: ProcessCellForExportParams): string => {
  const value: string | null = params.value;
  const formattedValue: string = value
    ? DateTime.fromISO(value).isValid
      ? DateTime.fromISO(value).toFormat("yyyy-MM-dd HH:mm:ss")
      : value
    : "";
  return formattedValue;
};

export default dateTimeCellCallback;
