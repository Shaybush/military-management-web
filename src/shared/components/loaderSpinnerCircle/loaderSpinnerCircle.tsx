import { FC } from 'react';
import { ILoaderSpinnerCircleModel } from '../../models/loaderSpinnerCircle.model';

const LoaderSpinnerCircle: FC<ILoaderSpinnerCircleModel> = ({ color = 'text-dark', width = '100px' }) => {
	return (
		<div className='h-100 w-100 d-flex align-items-center justify-content-center mt-3'>
			<div className={`spinner-border ${color}`} style={{ width, height: width }} role='status'></div>
		</div>
	);
};

export default LoaderSpinnerCircle;
