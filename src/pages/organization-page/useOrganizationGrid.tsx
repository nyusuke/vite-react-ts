import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useOrganization } from "src/hooks/useOrganization";
import { getDefaultColDef } from "src/ag-grid/getDefaultColDef";
import type {
  ColDef,
  ColumnApi,
  GetContextMenuItemsParams,
  GridApi,
  GridOptions,
  GridReadyEvent,
  MenuItemDef,
  ProcessCellForExportParams,
} from "ag-grid-community";
import type { AgGridReact as AgGridReactType } from "ag-grid-react/lib/agGridReact";
import type { OrganizationType } from "src/types/organization";

export const useOrganizationGrid = () => {
  const gridRef = useRef<AgGridReactType>(null);
  const { isLoading } = useOrganization();
  const [gridApi, setGridApi] = useState<GridApi | undefined>(undefined);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | undefined>(
    undefined
  );

  // GRID SETTINGS
  // ================================================================================

  // ROWDATA:グリッドに表示するデータ
  // ----------------------------------------
  const { organizations } = useOrganization();

  // DEFAULT COLDEF: 全カラム共通の定義
  // ----------------------------------------
  const defaultColDef: ColDef = useMemo<ColDef>(
    () => getDefaultColDef({ flex: 1 }),
    []
  );

  // COLDEF: 各カラムの定義
  // ----------------------------------------
  const columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "id",
      headerTooltip: "id",
      maxWidth: 75,
    },
    {
      field: "division",
      headerName: "division",
      headerTooltip: "division",
      width: 100,
    },
    {
      field: "department",
      headerName: "department",
      headerTooltip: "department",
      width: 100,
    },
    {
      field: "section",
      headerName: "section",
      headerTooltip: "section",
    },
  ];

  // GRID OPTIONS
  // ----------------------------------------

  // 右クリックメニューの設定
  const getContextMenuItems = (
    params: GetContextMenuItemsParams<OrganizationType>
  ): (string | MenuItemDef)[] => {
    // console.log(params);
    if (params.node) {
      // Excel用の変換を行う
      const processCellCallback = (
        params: ProcessCellForExportParams<OrganizationType>
      ): string => {
        // console.log(params.value);
        const myColDef: ColDef<OrganizationType> = params.column.getColDef();
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
            action: () => params.api.exportDataAsExcel({ processCellCallback }),
          },
        ],
      };
      // https://www.ag-grid.com/react-data-grid/context-menu/#built-in-menu-items
      const menuItems = ["copy", "separator", exportMenu];
      return menuItems;
    } else {
      return [];
    }
  };

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
        if (organizations?.length) {
          gridApi.hideOverlay();
        } else {
          gridApi.showNoRowsOverlay();
        }
      }
    } else {
      // do nothing
    }
  }, [gridApi, isLoading, organizations]);

  // EVENT HANDLER: handlerはuseCallbackする
  // ================================================================================

  /**
   * グリッドが準備できたらAPIを利用できるようにする
   * @param params GridReadyEvent
   */
  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }, []);

  // RETURN
  // ================================================================================

  return {
    columnDefs,
    defaultColDef,
    gridRef,
    gridOptions,
    onGridReady,
    organizations,
  };
};
