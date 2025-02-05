import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

export type EditButtonProps = {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

// presentational componentはmemoする
export const EditButton = React.memo(
  ({ onAdd, onEdit, onDelete }: EditButtonProps): React.ReactElement => {
    return (
      <>
        <Box>
          <ButtonGroup variant="contained" aria-label="edit button group">
            <Button onClick={onAdd}>Add</Button>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
          </ButtonGroup>
        </Box>
      </>
    );
  }
);
