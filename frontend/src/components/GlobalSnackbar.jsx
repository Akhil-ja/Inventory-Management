import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { hideNotification } from "../slices/notification/notificationSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GlobalSnackbar() {
  const dispatch = useDispatch();
  const { isOpen, message, type } = useSelector((state) => state.notification);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideNotification());
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default GlobalSnackbar;
