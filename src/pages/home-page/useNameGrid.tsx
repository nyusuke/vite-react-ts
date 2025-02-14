import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChipListRenderer } from "src/ag-grid/cellRenderer/ChipListRenderer";
import { dateTimeFormatter } from "src/ag-grid/valueFormatter/dateTimeFormatter";
import { dateFilterComparator } from "src/ag-grid/comparator/dateFilterComparator";
import { getDefaultColDef } from "src/ag-grid/getDefaultColDef";
import type {
  ColDef,
  DefaultMenuItem,
  GetContextMenuItems,
  GetContextMenuItemsParams,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ProcessCellForExportParams,
} from "ag-grid-community";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { NameType } from "src/types/name";
import { themeBalham } from 'ag-grid-community';
import { useGetNamesQuery } from 'src/store/api/nameApi';

export const useNameGrid = () => {
  const gridRef = useRef<AgGridReactType>(null);
  const [gridApi, setGridApi] = useState<GridApi | undefined>(undefined);
  const theme = themeBalham.withParams({  });

  // RTK Queryを使用してデータを取得
  const { data: names, isLoading } = useGetNamesQuery();

  // GRID SETTINGS
  // ================================================================================

  // DEFAULT COLDEF: 全カラム共通の定義
  // ----------------------------------------
  const defaultColDef: ColDef = useMemo<ColDef>(() => getDefaultColDef({}), []);

  // COLDEF: 各カラムの定義
  // ----------------------------------------
  const columnDefs: ColDef[] = [
    {
      field: "id",
      filter: "agNumberColumnFilter", // 数値フィルタを指定
      width: 75,
    },
    {
      field: "name",
    },
    {
      field: "category",
      cellRenderer: ChipListRenderer,
    },
    {
      field: "createdAt",
      filter: "agDateColumnFilter", // 日付フィルタを指定
      filterParams: {
        // サーバからのデータの値が文字列のためそのままでは日付として比較できない
        // 文字列を日付に変換してから比較する関数を指定する
        comparator: dateFilterComparator,
      },
      valueFormatter: dateTimeFormatter, // データの表示フォーマットを変更
      // useValueFormatterForExport: true, // 何故かExcelで効かない
    },
    {
      field: "createdBy",
    },
    {
      field: "updatedAt",
      filter: "agDateColumnFilter", // 日付フィルタを指定
      filterParams: {
        // サーバからのデータの値が文字列のためそのままでは日付として比較できない
        // 文字列を日付に変換してから比較する関数を指定する
        comparator: dateFilterComparator,
      },
      valueFormatter: dateTimeFormatter, // データの表示フォーマットを変更
      // useValueFormatterForExport: true, // 何故かExcelで効かない
    },
    {
      field: "updatedBy",
    },
  ];

  // GRID OPTIONS
  // ----------------------------------------

  // 右クリックメニューの設定
  const getContextMenuItems = useCallback(
    (params: GetContextMenuItemsParams) => {
      // console.log(params);
      if (params.node) {
        // Excel用の変換を行う
        const processCellCallback = (
          params: ProcessCellForExportParams<NameType>
        ): string => {
          // console.log(params.value);
          const myColDef: ColDef = params.column.getColDef();
          const myField: string | undefined = myColDef.field ?? myColDef.colId;
          if (myField === "fooField") {
            const formattedValue: string = params.value ?? "";
            // console.log(formattedValue);
            return formattedValue;
          } else {
            return params.value ?? "";
          }
        };
        const exportMenu = {
          icon: '<span class="ag-icon ag-icon-save" unselectable="on"></span>',
          name: "Export",
          subMenu: [
            {
              name: "CSV Export",
              action: () => params.api.exportDataAsCsv({ processCellCallback }),
            },
            {
              name: "Excel Export (.xlsx)",
              action: () =>
                params.api.exportDataAsExcel({ processCellCallback }),
            },
          ],
        };
        // https://www.ag-grid.com/react-data-grid/context-menu/#built-in-menu-items
        const menuItems = [
          "copy" as DefaultMenuItem,
          "separator" as DefaultMenuItem,
          exportMenu,
        ];
        return menuItems;
      } else {
        return [];
      }
    },
    []
  );

  const gridOptions: GridOptions = {
    getContextMenuItems,
  };

  // SIDE EFFECT
  // ================================================================================

  // Loading, NoRowsのグリッド表示
  useEffect(() => {
    if (gridApi) {
      if (isLoading) {
        gridApi.showLoadingOverlay();
      } else {
        if (names?.length) {
          gridApi.hideOverlay();
        } else {
          gridApi.showNoRowsOverlay();
        }
      }
    }
  }, [gridApi, isLoading, names]);

  // EVENT HANDLER: handlerはuseCallbackする
  // ================================================================================

  /**
   * グリッドが準備できたらAPIを利用できるようにする
   * @param params GridReadyEvent
   */
  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  // RETURN
  // ================================================================================

  return {
    columnDefs,
    defaultColDef,
    gridRef,
    gridOptions,
    onGridReady,
    names,
    theme,
  };
};
