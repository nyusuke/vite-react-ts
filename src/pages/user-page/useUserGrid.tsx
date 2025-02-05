import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dateTimeFormatter } from "src/ag-grid/valueFormatter/dateTimeFormatter";
import { dateFilterComparator } from "src/ag-grid/comparator/dateFilterComparator";
import { useOrganization } from "src/hooks/useOrganization";
import { useUser } from "src/hooks/useUser";
import { getDefaultColDef } from "src/ag-grid/getDefaultColDef";
import { read, utils, writeFileXLSX } from "xlsx";
import dateTimeCellCallback from "src/ag-grid/processCellCallback/dateTimeCellCallback";
import type {
  ColDef,
  ColumnApi,
  GetContextMenuItemsParams,
  GridApi,
  GridOptions,
  GridReadyEvent,
  MenuItemDef,
  ProcessCellForExportParams,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import type { AgGridReact as AgGridReactType } from "ag-grid-react/lib/agGridReact";
import type { UserType } from "src/types/user";
import { updateGrid } from "src/slices/user";
import { useDispatch } from "src/store";

export const useUserGrid = () => {
  const dispatch = useDispatch();
  const maxFiles: number = 1;
  const gridRef = useRef<AgGridReactType>(null);
  const { organizations, getOrganizationName } = useOrganization();
  const { isLoading } = useUser();
  const [gridApi, setGridApi] = useState<GridApi | undefined>(undefined);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | undefined>(
    undefined
  );

  // GRID SETTINGS
  // ================================================================================

  // ROWDATA:グリッドに表示するデータ
  // ----------------------------------------
  const { users } = useUser();

  // DEFAULT COLDEF: 全カラム共通の定義
  // ----------------------------------------
  const defaultColDef: ColDef = useMemo<ColDef>(() => getDefaultColDef({}), []);

  // COLDEF: 各カラムの定義
  // ----------------------------------------

  const organizationIdFormatter = (
    params: ValueFormatterParams<UserType> | ValueGetterParams<UserType>
  ) => {
    const id = params.data?.organizationId;
    const name = getOrganizationName(id);
    return name;
  };

  const columnDefs: ColDef<UserType>[] = [
    {
      field: "id",
      headerName: "id",
      filter: "agNumberColumnFilter", // 数値フィルタを指定
      maxWidth: 75,
    },
    {
      field: "firstName",
      headerName: "firstName",
    },
    {
      field: "lastName",
      headerName: "lastName",
    },
    {
      field: "email",
      headerName: "email",
    },
    {
      field: "organizationId",
      headerName: "organizationId",
      valueFormatter: organizationIdFormatter,
      filterValueGetter: organizationIdFormatter,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      filter: "agDateColumnFilter", // 日付フィルタを指定
      filterParams: {
        // サーバからのデータの値が文字列のためそのままでは日付として比較できない
        // 文字列を日付に変換してから比較する関数を指定する
        comparator: dateFilterComparator,
      },
      valueFormatter: dateTimeFormatter, // データの表示フォーマットを変更
    },
    {
      field: "createdBy",
      headerName: "createdBy",
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      filter: "agDateColumnFilter", // 日付フィルタを指定
      filterParams: {
        // サーバからのデータの値が文字列のためそのままでは日付として比較できない
        // 文字列を日付に変換してから比較する関数を指定する
        comparator: dateFilterComparator,
      },
      valueFormatter: dateTimeFormatter, // データの表示フォーマットを変更
    },
    {
      field: "updatedBy",
      headerName: "updatedBy",
    },
  ];

  // GRID OPTIONS
  // ----------------------------------------

  // Export時のコールバック
  const processCellCallback = (
    params: ProcessCellForExportParams<UserType>
  ): string => {
    // console.log(params.value);
    const myColDef: ColDef<UserType> = params.column.getColDef();
    const myField: string | undefined = myColDef.field ?? myColDef.colId;
    if (myField === "createdAt" || myField === "updatedAt") {
      const formattedValue: string = dateTimeCellCallback(params);
      console.log(params.value, formattedValue);
      return formattedValue;
    } else {
      return params.value ?? "";
    }
  };

  // 右クリックメニューの設定
  const getContextMenuItems = (
    params: GetContextMenuItemsParams<UserType>
  ): (string | MenuItemDef)[] => {
    // console.log(params);
    if (params.node) {
      // Excel用の変換を行う
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

  const gridOptions: GridOptions<UserType> = {
    getContextMenuItems,
  };

  // GRID CONTEXT
  // ----------------------------------------
  const context = {};

  // SIDE EFFECT
  // ================================================================================

  // Loading, NoRowsのグリッド表示
  useEffect(() => {
    if (gridApi) {
      if (isLoading) {
        gridApi.showLoadingOverlay();
      } else {
        if (users?.length) {
          gridApi.hideOverlay();
        } else {
          gridApi.showNoRowsOverlay();
        }
      }
    } else {
      // do nothing
    }
  }, [gridApi, isLoading, users]);

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

  /**
   * Excelダウンロード
   */
  const handleExport = useCallback((): void => {
    if (gridApi) {
      gridApi.exportDataAsExcel({ processCellCallback });
    }
  }, [gridApi]);

  /* get users data and export to XLSX */
  const handleExportBySheetJS = useCallback(() => {
    const ws = utils.json_to_sheet(users);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "User Data");
    writeFileXLSX(wb, "SheetJSExportSample.xlsx");
  }, [users]);

  /**
   * インポート
   */
  const handleImport = useCallback(
    async (acceptedFiles: File[]): Promise<void> => {
      const file = acceptedFiles[0];
      if (file) {
        processFile(file);
      }
    },
    []
  );
  /**
   * インポート
   */
  const handleImportByInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      e.preventDefault();
      const files = e.currentTarget.files;
      const file = files?.item(0);
      if (file) {
        processFile(file);
      }
    },
    []
  );

  const processFile = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      console.log(buffer);
      const workbook = read(buffer, { type: "buffer", bookVBA: true });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = utils.sheet_to_json(worksheet) as UserType[];
      const mapped = data.map((user) => {
        const {
          id,
          email,
          firstName,
          lastName,
          role,
          organizationId,
          isDeleted,
          createdAt,
          createdBy,
          updatedAt,
          updatedBy,
        } = user;
        const newUser = {
          id,
          email,
          firstName,
          lastName,
          role,
          organizationId,
          isDeleted,
          createdAt,
          createdBy,
          updatedAt,
          updatedBy,
        };
        return newUser;
      });
      console.log(mapped);
      // dispatch(updateGrid(data));
    } catch (e) {
      console.log("error occurred:", e);
    }
  };

  // RETURN
  // ================================================================================

  return {
    columnDefs,
    context,
    defaultColDef,
    gridRef,
    gridOptions,
    onGridReady,
    maxFiles,
    handleExport,
    handleExportBySheetJS,
    handleImport,
    handleImportByInput,
    organizations,
    users,
  };
};
