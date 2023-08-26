import CircleLoader from 'react-spinners/CircleLoader';
import loaderStyles from './loader.module.css';

export default function Loader(): JSX.Element {
  return (
    <div className={loaderStyles.loader__container}>
      <CircleLoader
        color={'#4481C3'}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

