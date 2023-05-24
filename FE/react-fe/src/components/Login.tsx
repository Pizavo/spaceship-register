import {Box, Button, Link, TextField} from '@mui/material';
import {atom, useAtom} from 'jotai';
import React, {useState} from 'react';
import {catchError, EMPTY} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {AuthenticationRequest} from '../models/http/requests/authentication-request';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {tokenAtom} from '../App';
import {AuthenticationResponse} from '../models/http/responses/authentication-response';

const loginEmailAtom = atom<undefined | string>(undefined);

export const Login = () => {
	const [, setToken] = useAtom(tokenAtom);
	const [email, setEmail] = useAtom(loginEmailAtom);
	const [password, setPassword] = useState<string>('');
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (!email || !password) {
			toast.error('Empty email and/or password');
			return;
		}
		
		const request: AuthenticationRequest = {
			email: email!,
			password: password,
		};
		
		ajax<AuthenticationResponse>(
			{
				url: `${process.env.REACT_APP_API_URL}/user/authenticate`,
				method: 'POST',
				body: request,
			})
			.pipe(catchError((err) => {
				toast.error('Failed to login');
				console.error(err);
				return EMPTY;
			}))
			.subscribe((res) => {
				setToken(res.response.token);
			});
	};
	
	const navigate = useNavigate();
	
	return (
		<>
			<Box
				component="form"
				sx={{
					'& > :not(style)': {m: 1, width: '30ch'},
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
				noValidate
				autoComplete="on"
				onSubmit={handleSubmit}
			>
				<TextField id="email" label="E-mail" value={email}
				           onChange={(e) => setEmail(e.target.value)}/>
				<TextField id="password" label="Password" type="password"
				           onChange={(e) => setPassword(e.target.value)}/>
				<Button variant="outlined" type="submit">Login</Button>
			</Box>
			<div style={{textAlign: 'center'}}>
				<Link sx={{cursor: 'pointer'}} onClick={() => navigate('/signup')}>Signup</Link>
			</div>
		</>
	);
};
