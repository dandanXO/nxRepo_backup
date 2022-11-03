import classNames from "classnames";
import React, {useCallback} from "react";
import PropTypes from "prop-types";
import Transition, {ENTERED, ENTERING} from "react-transition-group/Transition";
import onEnd from "dom-helpers/transition/end";
import triggerBrowserReflow from "./triggerBrowserReflow";

const propTypes = {
    in: PropTypes.bool,
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    appear: PropTypes.bool,
    timeout: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.element,
    onEnter: PropTypes.func,
};
const defaultProps = {
    in: false,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    timeout: 300,
    className: "",
    children: undefined,
    onEnter: () => {},
};
const fadeStyles = {
    [ENTERING]: "show",
    [ENTERED]: "show",
};
const Fade = React.forwardRef(({ className, children, ...props }, ref) => {
    const handleEnter = useCallback(
        node => {
            triggerBrowserReflow(node);
            if (props.onEnter) props.onEnter(node);
        },
        [props]
    );
    return (
        <Transition ref={ref} addEndListener={onEnd} {...props} onEnter={handleEnter}>
            {(status, innerProps) =>
                React.cloneElement(children, {
                    ...innerProps,
                    className: classNames("fade", className, children.props.className, fadeStyles[status]),
                })
            }
        </Transition>
    );
});

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;
Fade.displayName = "Fade";

export default Fade;
