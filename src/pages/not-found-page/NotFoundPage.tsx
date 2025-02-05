import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function NotFoundPage() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error" sx={{ py: 6, justifyContent: "center" }}>
        <AlertTitle>Oops… You just found an error page</AlertTitle>
        We are sorry but the page you are looking for was not found
      </Alert>
    </Stack>
  );
}
