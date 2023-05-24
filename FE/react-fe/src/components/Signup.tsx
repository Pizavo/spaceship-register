import {Box, Button, Link, TextField} from '@mui/material';
import React, {useState} from 'react';
import {useAtom} from 'jotai';
import {ajax} from 'rxjs/ajax';
import {catchError, EMPTY} from 'rxjs';
import {User} from '../models/entities/user';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {atomWithReset, RESET} from 'jotai/utils';

const signupForenameAtom = atomWithReset<null | string>(null);
const signupOwnershipCodeAtom = atomWithReset<null | string>(null);
const signupSurnameAtom = atomWithReset<null | string>(null);
const signupEmailAtom = atomWithReset<null | string>(null);
const signupNicknameAtom = atomWithReset<null | string>(null);

const Signup = () => {
	const [ownershipCode, setOwnershipCode] = useAtom(signupOwnershipCodeAtom);
	const [forename, setForename] = useAtom(signupForenameAtom);
	const [surname, setSurname] = useAtom(signupSurnameAtom);
	const [email, setEmail] = useAtom(signupEmailAtom);
	const [nickname, setNickname] = useAtom(signupNicknameAtom);
	
	const [password, setPassword] = useState<string>('');
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (!isFormValid()) {
			toast.error('Invalid form');
			return;
		}
		
		const user: User = {
			ownershipCode: ownershipCode!,
			forename: forename!,
			surname: surname!,
			email: email!,
			nickname: nickname!,
			password: password!,
		};
		
		ajax({
			     url: `${process.env.REACT_APP_API_URL}/user/register`,
			     method: 'POST',
			     body: user,
		     })
			.pipe(catchError((err) => {
				toast.error('Failed to register');
				console.error(err);
				return EMPTY;
			}))
			.subscribe(() => {
				toast.success('Successfully registered');
				resetForm();
				navigate('/login');
			});
	};
	
	const isOwnershipCodeValid = () => ownershipCode && /\w{8}-\w{4}-[12345]\w{3}-\w{4}-\w{12}/.test(ownershipCode);
	const isForenameValid = () => !!forename;
	const isSurnameValid = () => !!surname;
	const isEmailValid = () => email && /\w+@\w+\.\w{1,4}/.test(email);
	const isNicknameValid = () => !!nickname;
	const isPasswordValid = () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\\/\-()?])(?=.{8,})/.test(password);
	const isPasswordConfirmationValid = () => password === passwordConfirmation;
	const isFormValid = () => isOwnershipCodeValid() && isForenameValid() && isSurnameValid() && isEmailValid() && isNicknameValid() && isPasswordValid() && isPasswordConfirmationValid();
	
	const navigate = useNavigate();
	
	const resetForm = () => {
		setOwnershipCode(RESET);
		setForename(RESET);
		setSurname(RESET);
		setEmail(RESET);
		setNickname(RESET);
	};
	
	return (
		<>
			<Box
				component="form"
				sx={{
					'& > :not(style)': {m: 1, width: '50ch'},
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
				autoComplete="on"
				onSubmit={handleSubmit}
			>
				<TextField error={!isNicknameValid()} id="nickname" label="Nickname" value={nickname}
				           onChange={(e) => setNickname(e.target.value)}/>
				<TextField error={!isForenameValid()} id="forename" label="Forename" value={forename}
				           onChange={(e) => setForename(e.target.value)}/>
				<TextField error={!isSurnameValid()} id="surname" label="Surname" value={surname}
				           onChange={(e) => setSurname(e.target.value)}/>
				<TextField error={!isEmailValid()} id="email" label="E-mail"
				           helperText={
					           isEmailValid()
						           ? ''
						           : 'Invalid e-mail format'
				           }
				           onChange={(e) => setEmail(e.target.value)}/>
				<TextField error={!isOwnershipCodeValid()} id="ownershipCode" label="Ownership Code"
				           value={ownershipCode}
				           helperText={
					           isOwnershipCodeValid()
						           ? ''
						           : <span>Ownership code must be a UUID in format<br/>XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX</span>
				           }
				           onChange={(e) => setOwnershipCode(e.target.value)}/>
				<TextField error={!isPasswordValid()} id="password" label="Password" type="password"
				           helperText={
					           isPasswordValid()
						           ? ''
						           : 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
				           }
				           onChange={(e) => setPassword(e.target.value)}/>
				<TextField error={!isPasswordConfirmationValid()} id="passwordConfirmation"
				           label="Password Confirmation" type="password"
				           helperText={
					           isPasswordConfirmationValid()
						           ? ''
						           : 'Password confirmation must match password'
				           }
				           onChange={(e) => setPasswordConfirmation(e.target.value)}/>
				<Button variant="outlined" type="submit" disabled={!isFormValid()}>Signup</Button>
			</Box>
			<div style={{textAlign: 'center'}}>
				<Link sx={{cursor: 'pointer'}} onClick={() => navigate('/login')}>Login</Link>
			</div>
		</>
	);
};

export {Signup};
