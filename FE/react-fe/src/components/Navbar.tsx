import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {atom, useAtom} from 'jotai';
import {RESET} from 'jotai/utils';
import {tokenAtom} from '../App';

const pages = [
	{name: 'Spaceships', path: '/overview', loginRequired: true},
	{name: 'Register Spaceship', path: '/spaceship', loginRequired: true},
	{name: 'Components Overview', path: '/components', loginRequired: true},
];

const anchorElNavAtom = atom<null | HTMLElement>(null);

export const Navbar = () => {
	const [token, setToken] = useAtom(tokenAtom);
	const [anchorElNav, setAnchorElNav] = useAtom(anchorElNavAtom);
	
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	
	const navigate = useNavigate();
	
	return (
		<>
			<AppBar position="static" sx={{mb: '1.5em'}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: {xs: 'none', md: 'flex'},
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/')}
						>
							{process.env.REACT_APP_NAME}
						</Typography>
						
						<Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon/>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{display: {xs: 'block', md: 'none'}}}
							>
								{pages
									.filter(page => !!token === page.loginRequired)
									.map((page) => (
										<MenuItem key={page.name} onClick={() => {
											navigate(page.path);
											handleCloseNavMenu();
										}}>
											<Typography textAlign="center">{page.name}</Typography>
										</MenuItem>
									))}
								{token
									?
									<MenuItem key="logout" onClick={() => {
										setToken(RESET);
										handleCloseNavMenu();
									}}>
										<Typography textAlign="center">Logout</Typography>
									</MenuItem>
									:
									<MenuItem key="login" onClick={() => {
										navigate('/login');
										handleCloseNavMenu();
									}}>
										<Typography textAlign="center">Login</Typography>
									</MenuItem>
								}
							</Menu>
						</Box>
						<Typography
							variant="h5"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: {xs: 'flex', md: 'none'},
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/')}
						>
							{process.env.REACT_APP_NAME}
						</Typography>
						<Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
							{pages
								.filter(page => !!token === page.loginRequired)
								.map((page) => (
									<Button
										key={page.name}
										onClick={() => navigate(page.path)}
										sx={{my: 2, color: 'white', display: 'block'}}
									>
										{page.name}
									</Button>
								))}
						</Box>
						<Box sx={{display: {xs: 'none', md: 'flex'}}}>
							{token
								?
								<Button
									sx={{my: 2, color: 'white', display: 'block'}}
									onClick={() => setToken(RESET)}
								>
									Logout
								</Button>
								:
								<Button
									sx={{my: 2, color: 'white', display: 'block'}}
									onClick={() => navigate('/login')}
								>
									Login
								</Button>
							}
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};
