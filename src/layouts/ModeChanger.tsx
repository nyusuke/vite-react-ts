import React from "react";
import Box from "@mui/material/Box";
import SwitchMode from "src/components/SwitchMode";
import type { Theme } from "@mui/material";

interface ModeChangerProps {
  theme: Theme;
  onSwitchMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ModeChanger = ({ theme, onSwitchMode }: ModeChangerProps) => {
  // Side Effect
  // ========================================

  // Event Handler
  // ========================================

  // View
  // ========================================

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <SwitchMode
          theme={theme}
          sx={{ m: 1 }}
          onChange={onSwitchMode}
          inputProps={{ "aria-label": "Swich Dark Mode" }}
        />
      </Box>
    </>
  );
};
