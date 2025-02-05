import type { ColDef } from "ag-grid-community";
import { commonColDef } from "./commonColDef";

export function getDefaultColDef(customColDef: ColDef): ColDef {
  const colDef: ColDef = Object.assign({}, commonColDef, customColDef);
  return colDef;
}
