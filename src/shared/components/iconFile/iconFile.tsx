import React, { useMemo, FC } from "react";
import { iconConfig } from "../../../core/config/icon.config";
import { isStringEmptyUtil } from "../../services/util/string-util.service";
import LoaderSpinnerCircle from "../loaderSpinnerCircle";
import { Link } from "react-router-dom";
import { IIconFileModel } from "../../models/iconFile.model";

const UNDEFINED_SRC = "";

const IconFile: FC<IIconFileModel> = ({
  styleClass = "",
  width = 16,
  height = 16,
  iconSrc,
  link,
}) => {
  const icon = useMemo(() => {
    if (iconConfig[iconSrc]) return iconConfig[iconSrc];
    // icon source not found in config
    return UNDEFINED_SRC;
  }, [iconSrc]);

  return (
    <React.Fragment>
      {isStringEmptyUtil(icon) ? (
        // loading spinner
        <LoaderSpinnerCircle/>
      ) : link ? (
        <Link to={link}>
          <img
            className={styleClass}
            src={icon}
            width={width}
            height={height}
            alt="icon"
          />
        </Link>
      ) : (
        <img
          className={styleClass}
          src={icon}
          width={width}
          height={height}
          alt="icon"
        />
      )}
    </React.Fragment>
  );
};

export default IconFile;