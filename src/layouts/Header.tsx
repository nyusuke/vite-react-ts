import Container from "@mui/material/Container";
import { AppBar, Box, Toolbar } from "@mui/material";
import { MainTitle } from "./Title";
import { ModeChanger } from "./ModeChanger";
import { useColorScheme, useTheme } from "@mui/material/styles";

export const Header = () => {
  const theme = useTheme();
  const { setMode } = useColorScheme();

  // Side Effect
  // ========================================

  // Event Handler
  // ========================================

  const handleSwitchMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked: boolean = event.currentTarget.checked;
    if (checked) {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  // View
  // ========================================

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MainTitle />
          <Box sx={{ display: "flex", flexGrow: 1 }}></Box>
          <ModeChanger theme={theme} onSwitchMode={handleSwitchMode} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
