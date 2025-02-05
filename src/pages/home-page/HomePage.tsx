import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { PageTitle } from "src/components";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { useHomePageModel } from "./useHomePageModel";
import { useNameGrid } from "./useNameGrid";

export default function HomePage(): React.ReactElement {
  const pm = useHomePageModel();
  const gm = useNameGrid();

  return (
    <Container maxWidth={"lg"} sx={{ p: 6 }}>
      <Stack direction="column" spacing={3}>
        <PageTitle title="Name Data" />
        <Box style={{ height: "30vh" }}>
          <AgGridReact
            // ref={ref}
            theme={gm.theme}
            defaultColDef={gm.defaultColDef}
            columnDefs={gm.columnDefs}
            rowData={gm.names}
            onGridReady={gm.onGridReady}
            gridOptions={gm.gridOptions}
          />
        </Box>
      </Stack>
    </Container>
  );
}
