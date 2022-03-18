import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from './PasswordInput.module.css';

export const PasswordInput = ({ error, inputRef, name, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <FormControl className={styles.input} error={error} variant="outlined" fullWidth>
      <InputLabel htmlFor={name}>Enter Password</InputLabel>
      <OutlinedInput
        inputRef={inputRef}
        id={name}
        type={showPassword ? 'text' : 'password'}
        onChange={onChange}
        label="Enter Password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              edge="end"
              onMouseDown={e => e.preventDefault()}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
