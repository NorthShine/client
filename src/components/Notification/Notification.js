import { Snackbar, Alert } from '@mui/material';
import { useNotification } from '../../hooks/useNotification';

export const Notification = () => {
  const { open, setOpen, message, severity } = useNotification();

  const position = { vertical: 'top', horizontal: 'center' };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={position}>
      <Alert onClose={() => setOpen(false)} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
