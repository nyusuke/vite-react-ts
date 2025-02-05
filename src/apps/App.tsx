import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { Provider } from "react-redux";
import MainRoutes from "./routes";
import ErrorBoundary from "./ErrorBoundary";
import store from "../store";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  ModuleRegistry,
} from 'ag-grid-community';
import {
  AllEnterpriseModule,
} from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  AllEnterpriseModule,
]);

function App() {
  useEffect(() => {
    document.body.classList.remove("load");
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={createTheme({})}>
            <CssVarsProvider>
              <CssBaseline />
              <MainRoutes />
            </CssVarsProvider>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
