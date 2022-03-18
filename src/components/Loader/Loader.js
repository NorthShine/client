import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.background}>
      <CircularProgress className={styles.loader} />
    </div>
  );
};
