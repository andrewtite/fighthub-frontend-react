import React from "react";
import PropTypes from 'prop-types';

const displayName = 'Universe Logo';
const propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    onClick: PropTypes.func
};
const UniverseSelectLogo = props => {
    const {className, src, onClick} = props;
    return (
        <div>
            <img
                className={className}
                src={src}
                onClick={onClick}
            />
        </div>
    )
};
UniverseSelectLogo.displayName = displayName;
UniverseSelectLogo.propTypes = propTypes;
export default UniverseSelectLogo;