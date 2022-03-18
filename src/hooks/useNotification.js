import { useContext } from 'react';
import { NotificationContext } from '../providers/NotificationProvider';

export const useNotification = () => {
  const { open, setOpen, message, setMessage, severity, setSeverity } =
    useContext(NotificationContext);

  function warning(message) {
    setOpen(true);
    setMessage(message ?? 'Warning');
    setSeverity('warning');
  }

  function error(message) {
    setOpen(true);
    setMessage(message ?? 'Error');
    setSeverity('error');
  }

  function info(message) {
    setOpen(true);
    setMessage(message ?? 'Info');
    setSeverity('info');
  }

  function success(message) {
    setOpen(true);
    setMessage(message ?? 'Success');
    setSeverity('success');
  }

  return {
    open,
    message,
    severity,
    setOpen,
    setMessage,
    setSeverity,
    warning,
    success,
    info,
    error
  };
};
