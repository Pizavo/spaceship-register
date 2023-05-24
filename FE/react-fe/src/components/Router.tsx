import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './Login';
import {NoPage} from './NoPage';
import {GuardedRoute} from './GuardedRoute';
import {SpaceshipOverview} from './SpaceshipOverview';
import {Signup} from './Signup';
import {SpaceshipForm} from './SpaceshipForm';
import {useAtom} from 'jotai';
import {tokenAtom} from '../App';
import {ComponentsOverview} from './ComponentsOverview';

const mainRoute = '/overview';

export const Router = () => {
	const [token] = useAtom(tokenAtom);
	
	return (
		<>
			<Routes>
				<Route element={<GuardedRoute isRouteAccessible={!token} redirectRoute={mainRoute}/>}>
					<Route path="login" element={<Login/>}/>
					<Route path="signup" element={<Signup/>}/>
				</Route>
				<Route element={<GuardedRoute isRouteAccessible={!!token} redirectRoute="/login"/>}>
					<Route path="" element={<Navigate to={mainRoute} replace/>}></Route>
					<Route path={mainRoute} element={<SpaceshipOverview/>}/>
					<Route path="spaceship">
						<Route path="" element={<SpaceshipForm/>}></Route>
						<Route path=":id" element={<SpaceshipForm/>}></Route>
					</Route>
					<Route path="components" element={<ComponentsOverview/>}></Route>
				</Route>
				<Route path="*" element={<NoPage/>}/>
			</Routes>
		</>
	);
};
