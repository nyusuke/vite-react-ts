import Typography from "@mui/material/Typography";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { APP_TITLE } from "src/constants";

export const MainTitle = () => {
  // Side Effect
  // ========================================

  // Event Handler
  // ========================================

  // View
  // ========================================

  return (
    <>
      <CelebrationIcon sx={{ display: "flex", mr: 2 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {APP_TITLE}
      </Typography>
    </>
  );
};
