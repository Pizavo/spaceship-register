import React from 'react';
import './App.scss';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {Navbar} from './components/Navbar';
import {atomWithStorage} from 'jotai/utils';
import {Router} from './components/Router';
import {ToastContainer} from 'react-toastify';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';

const darkTheme = createTheme(
	{
		palette: {
			mode: 'dark',
		},
	});

export const tokenAtom = atomWithStorage<string | null>('token', null);

export const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<CssBaseline/>
				<main>
					<Navbar/>
					<Router/>
				</main>
				<ToastContainer
					position="bottom-left"
					hideProgressBar={true}
					theme="dark"
				/>
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export default App;
