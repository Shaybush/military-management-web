import { FC } from 'react';
import { ILoaderSpinnerCircleModel } from '../../models/loaderSpinnerCircle.model';


const LoaderSpinnerCircle: FC<ILoaderSpinnerCircleModel> = ({ color = 'text-dark' }) => {
  return (
    <div className={`spinner-border ${color}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoaderSpinnerCircle;