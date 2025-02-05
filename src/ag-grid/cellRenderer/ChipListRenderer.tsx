import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { ICellRendererParams } from "ag-grid-community";

const ChipListRendererComponent = <TData, TValue, TContext>(
  params: ICellRendererParams<TData, TValue, TContext>
): React.ReactElement => {
  const values: TValue | null | undefined = params.value;

  return (
    <Stack direction="row" spacing={1}>
      {values && Array.isArray(values)
        ? values.map((value, index) => (
            <Chip key={"value-" + index} label={value} size="small" />
          ))
        : ""}
    </Stack>
  );
};

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
export const ChipListRenderer = React.memo(
  ChipListRendererComponent
) as typeof ChipListRendererComponent;
