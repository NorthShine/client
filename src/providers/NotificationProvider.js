import { useState, createContext } from 'react';
import { Notification } from '../components/Notification/Notification';

export const NotificationContext = createContext({
  open: false,
  setOpen: open => {},
  message: '',
  setMessage: message => {},
  severity: 'info',
  setSeverity: severity => {}
});

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const context = {
    open,
    setOpen,
    message,
    setMessage,
    severity,
    setSeverity
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
      <Notification />
    </NotificationContext.Provider>
  );
};
