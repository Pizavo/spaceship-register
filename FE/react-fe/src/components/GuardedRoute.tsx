import {Navigate, Outlet} from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
	isRouteAccessible: PropTypes.bool.isRequired,
	redirectRoute: PropTypes.string.isRequired,
};
type GuardedRoutePropTypes = PropTypes.InferProps<typeof propTypes>;

const GuardedRoute = ({isRouteAccessible = false, redirectRoute = '/'}: GuardedRoutePropTypes) => {
	return (
		<>
			{isRouteAccessible ? <Outlet/> : <Navigate to={redirectRoute} replace/>}
		</>
	);
};

GuardedRoute.propTypes = propTypes;

export {GuardedRoute};