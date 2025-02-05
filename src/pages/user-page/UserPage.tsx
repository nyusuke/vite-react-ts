import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { PageTitle } from "src/components";
import Dropzone from "react-dropzone";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useUserPageModel } from "./useUserPageModel";
import { useUserGrid } from "./useUserGrid";

export default function UserPage(): React.ReactElement {
  const pm = useUserPageModel();
  const gm = useUserGrid();

  return (
    <Container maxWidth={"lg"} sx={{ p: 6 }}>
      <Stack direction="column" spacing={3}>
        <PageTitle title="User Data" />
        <Box className="ag-theme-balham" style={{ height: "30vh" }}>
          <AgGridReact
            ref={gm.gridRef}
            defaultColDef={gm.defaultColDef}
            columnDefs={gm.columnDefs}
            rowData={gm.users}
            onGridReady={gm.onGridReady}
            gridOptions={gm.gridOptions}
            context={gm.context}
          />
        </Box>
        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          <Button
            className="btn btn-primary cell-actions-button "
            disabled={!gm.users.length}
            onClick={gm.handleExport}
            // onClick={gm.handleExportBySheetJS}
          >
            <CloudDownloadIcon />
            &nbsp;&nbsp;Export
          </Button>
          <Dropzone onDrop={gm.handleImport} maxFiles={gm.maxFiles}>
            {({ getRootProps, getInputProps }) => {
              return (
                <>
                  <Button
                    className="btn btn-primary cell-actions-button "
                    disabled={!gm.users.length}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <CloudUploadIcon />
                    &nbsp;&nbsp;Import
                  </Button>
                </>
              );
            }}
          </Dropzone>
          {/* <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // ref={fileInput}
            onChange={gm.handleImportByInput}
          /> */}
        </Stack>
      </Stack>
    </Container>
  );
}
