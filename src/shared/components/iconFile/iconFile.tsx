import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { iconConfig } from '../../../core/config/icon.config';
import LoaderSpinnerCircle from '../loaderSpinnerCircle';
import { IIconFileModel } from '../../models/iconFile.model';
import { isStringEmptyUtil } from '../../services/string-util.service';

const UNDEFINED_SRC = '';

const IconFile: FC<IIconFileModel> = ({ styleClass = '', width = 16, height = 16, iconSrc, link }) => {
	const icon = useMemo(() => {
		if (iconConfig[iconSrc]) return iconConfig[iconSrc];
		// icon source not found in config
		return UNDEFINED_SRC;
	}, [iconSrc]);

	return (
		<React.Fragment>
			{isStringEmptyUtil(icon) ? (
				// loading spinner
				<LoaderSpinnerCircle />
			) : link ? (
				<Link to={link}>
					<img className={styleClass} src={icon} width={width} height={height} alt='icon' />
				</Link>
			) : (
				<img className={styleClass} src={icon} width={width} height={height} alt='icon' />
			)}
		</React.Fragment>
	);
};

export default IconFile;
