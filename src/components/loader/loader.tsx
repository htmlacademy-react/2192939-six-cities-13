import CircleLoader from 'react-spinners/CircleLoader';
// import { CSSProperties } from 'react';
import loaderStyles from './loader.module.css';

// const override: CSSProperties = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'space-around',
//   height: '100vh',
// };

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

