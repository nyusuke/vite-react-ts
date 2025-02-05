import { DateTime } from "luxon";
import type { ProcessCellForExportParams } from "ag-grid-community";

const dateCellCallback = (params: ProcessCellForExportParams): string => {
  const value: string | null = params.value;
  const formattedValue: string = value
    ? DateTime.fromISO(value).isValid
      ? DateTime.fromISO(value).toFormat("yyyy-MM-dd")
      : value
    : "";
  return formattedValue;
};

export default dateCellCallback;
