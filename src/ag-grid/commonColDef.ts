import type { ColDef } from "ag-grid-community";

export const commonColDef: ColDef = {
  sortable: true, // 全カラムをソート可能にする
  resizable: true, // 全カラムの幅をリサイズ可能にする
  filter: true, // 全カラムをフィルタ可能にする
};
