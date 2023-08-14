import { useAppSelector } from '../../hooks';
import { getError } from '../../store/app-process/selectors';
import styles from './styles.module.css';

export default function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  return (error)
    ? <div className={styles.errorMessage}>{error}</div>
    : null;
}
