import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { PageTitle } from "src/components";
import { EditButton } from "src/components/EditButton";
import { TextSearch } from "src/components/TextSearch";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useOrganizationPageModel } from "./useOrganizationPageModel";
import { useOrganizationGrid } from "./useOrganizationGrid";

export default function OrganizationPage(): React.ReactElement {
  const pm = useOrganizationPageModel();
  const gm = useOrganizationGrid();

  return (
    <Container maxWidth={"lg"} sx={{ p: 6 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageTitle title="Organization Page" />
        </Grid>
        <Grid item xs={6}>
          <TextSearch
            searchText={pm.searchText}
            onChangeSearchText={pm.handleChangeSearchText}
            onSearch={pm.handleSearch}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          <EditButton
            onAdd={pm.handleAdd}
            onEdit={pm.handleEdit}
            onDelete={pm.handleDelete}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className="ag-theme-balham" style={{ height: "30vh" }}>
            <AgGridReact
              // ref={ref}
              defaultColDef={gm.defaultColDef}
              columnDefs={gm.columnDefs}
              rowData={gm.organizations}
              onGridReady={gm.onGridReady}
              gridOptions={gm.gridOptions}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
