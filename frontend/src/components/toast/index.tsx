import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Toast as ToastState } from "common/toast/toast-context";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Toast: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    ToastState.close();
  };

  React.useEffect(() => {
    setInterval(() => {
      const error = ToastState.error;
      if (error) {
        setError(error);
      } else {
        setError(null);
      }
    }, 250);
  }, []);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};