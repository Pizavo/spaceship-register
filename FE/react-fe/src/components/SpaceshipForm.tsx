import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	TextField,
} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {ajax} from 'rxjs/ajax';
import {catchError, EMPTY} from 'rxjs';
import {toast} from 'react-toastify';
import {Spaceship} from '../models/entities/spaceship';
import {useNavigate, useParams} from 'react-router-dom';
import {tokenAtom} from '../App';
import {Core} from '../models/entities/components/core';
import {Engine} from '../models/entities/components/engine';
import {LifeSupportUnit} from '../models/entities/components/life-support-unit';
import {DatePicker} from '@mui/x-date-pickers';

export const SpaceshipForm = () => {
	const [token] = useAtom(tokenAtom);
	
	const [name, setName] = useState<string>('');
	const [commission, setCommission] = useState<boolean>(false);
	
	const {id} = useParams();
	
	const [spaceship, setSpaceship] = useState<Spaceship | undefined>(undefined);
	
	const [cores, setCores] = useState<Core[]>([]);
	const [engines, setEngines] = useState<Engine[]>([]);
	const [lifeSupportUnits, setLifeSupportUnits] = useState<LifeSupportUnit[]>([]);
	
	const [coreId, setCoreId] = useState<string | undefined>(undefined);
	const [aiVersion, setAiVersion] = useState<string | undefined>(undefined);
	
	const [engineId, setEngineId] = useState<string | undefined>(undefined);
	const [lastRevision, setLastRevision] = useState<Date | undefined | null>(undefined);
	
	const [lifeSupportUnitId, setLifeSupportUnitId] = useState<string | undefined>(undefined);
	const [lastMaintenance, setLastMaintenance] = useState<Date | undefined | null>(undefined);
	
	const navigate = useNavigate();
	
	const loadSpaceship = useCallback(() => {
		if (id) {
			ajax<Spaceship>(
				{
					url: `${process.env.REACT_APP_API_URL}/spaceship/${id}`,
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.pipe(
					catchError((err) => {
						toast.error('Fetching spaceship failed');
						console.error(err);
						return EMPTY;
					}))
				.subscribe(res => {
					const spaceship = res.response;
					
					setSpaceship(spaceship);
					setName(spaceship.name);
					setCommission(spaceship.commission);
					
					setCoreId(spaceship.core?.type.id);
					setAiVersion(spaceship.core?.aiVersion);
					
					setEngineId(spaceship.engine?.type.id);
					setLastRevision(spaceship.engine?.lastRevision);
					
					setLifeSupportUnitId(spaceship.lifeSupportUnit?.type.id);
					setLastMaintenance(spaceship.lifeSupportUnit?.lastMaintenance);
				});
		}
	}, [id, token, setSpaceship]);
	
	const loadCores = useCallback(() => {
		ajax<Core[]>(
			{
				url: `${process.env.REACT_APP_API_URL}/core/list`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.pipe(catchError((err) => {
				toast.error('Failed to load cores');
				console.error(err);
				return EMPTY;
			}))
			.subscribe((res) => {
				setCores(res.response);
			});
	}, [token, setCores]);
	
	const loadEngines = useCallback(() => {
		ajax<Engine[]>(
			{
				url: `${process.env.REACT_APP_API_URL}/engine/list`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.pipe(catchError((err) => {
				toast.error('Failed to load engines');
				console.error(err);
				return EMPTY;
			}))
			.subscribe((res) => {
				setEngines(res.response);
			});
	}, [token, setEngines]);
	
	const loadLifeSupportUnits = useCallback(() => {
		ajax<LifeSupportUnit[]>(
			{
				url: `${process.env.REACT_APP_API_URL}/life-support-unit/list`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.pipe(catchError((err) => {
				toast.error('Failed to load life support units');
				console.error(err);
				return EMPTY;
			}))
			.subscribe((res) => {
				setLifeSupportUnits(res.response);
			});
	}, [token, setLifeSupportUnits]);
	
	useEffect(() => {
		loadSpaceship();
		loadCores();
		loadEngines();
		loadLifeSupportUnits();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (!name) {
			toast.error('Empty name');
			return;
		}
		
		const spaceship: Spaceship = {
			name: name,
			commission: commission,
		};
		
		if (spaceship) {
			spaceship.core = {
				type: cores.find(c => c.id === coreId)!,
				aiVersion: aiVersion!,
			};
			
			spaceship.engine = {
				type: engines.find(e => e.id === engineId)!,
				lastRevision: lastRevision!,
			};
			
			spaceship.lifeSupportUnit = {
				type: lifeSupportUnits.find(l => l.id === lifeSupportUnitId)!,
				lastMaintenance: lastMaintenance!,
			};
			
			ajax(
				{
					url: `${process.env.REACT_APP_API_URL}/spaceship`,
					method: 'PATCH',
					body: spaceship,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.pipe(catchError((err) => {
					toast.error('Failed to update a spaceship');
					console.error(err);
					return EMPTY;
				}))
				.subscribe(() => {
					toast.success('Spaceship updated');
					navigate('../', {replace: true});
				});
		} else {
			ajax(
				{
					url: `${process.env.REACT_APP_API_URL}/spaceship`,
					method: 'POST',
					body: spaceship,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.pipe(catchError((err) => {
					toast.error('Failed to register a spaceship');
					console.error(err);
					return EMPTY;
				}))
				.subscribe(() => {
					toast.success('Spaceship registered');
					navigate('../', {replace: true});
				});
		}
	};
	
	const updateRows = (
		<>
			<Box sx={{display: 'inline-flex'}}>
				<FormControl fullWidth sx={{mr: 2}}>
					<InputLabel id="coreLabel">Core</InputLabel>
					<Select
						labelId="coreLabel"
						id="core"
						value={coreId ?? ''}
						label="Core"
						onChange={(e) => setCoreId(e.target.value)}
						required
					>
						{cores.map((core) => (
							<MenuItem key={core.id} value={core.id}>{core.name}</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField id="aiVersion" label="AI Value" value={aiVersion}
				           onChange={(e) => setAiVersion(e.target.value)}
				           required
				/>
			</Box>
			<Box sx={{display: 'inline-flex'}}>
				<FormControl fullWidth sx={{mr: 2}}>
					<InputLabel id="engineLabel">Engine</InputLabel>
					<Select
						labelId="engineLabel"
						id="engine"
						value={engineId ?? ''}
						label="Engine"
						onChange={(e) => setEngineId(e.target.value)}
						required
					>
						{engines.map((engine) => (
							<MenuItem key={engine.id} value={engine.id}>{engine.name}</MenuItem>
						))}
					</Select>
				</FormControl>
				<DatePicker
					label="Last Revision"
					value={lastRevision}
					onChange={(value) => setLastRevision(value)}
				/>
			</Box>
			<Box sx={{display: 'inline-flex'}}>
				<FormControl fullWidth sx={{mr: 2}}>
					<InputLabel id="lifeSupportUnitLabel">Life Support Unit</InputLabel>
					<Select
						labelId="lifeSupportUnitLabel"
						id="lifeSupportUnit"
						value={lifeSupportUnitId ?? ''}
						label="Life Support Unit"
						onChange={(e) => setLifeSupportUnitId(e.target.value)}
						required
					>
						{lifeSupportUnits.map((lifeSupportUnit) => (
							<MenuItem key={lifeSupportUnit.id}
							          value={lifeSupportUnit.id}>{lifeSupportUnit.name}</MenuItem>
						))}
					</Select>
				</FormControl>
				<DatePicker
					label="Last Maintenance"
					value={lastMaintenance}
					onChange={(value) => setLastMaintenance(value)}
				/>
			</Box>
		</>
	);
	
	return (
		<>
			<Box
				component="form"
				sx={{
					'& > :not(style)': {m: 1, width: '55ch'},
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
				noValidate
				autoComplete="on"
				onSubmit={handleSubmit}
			>
				<TextField id="name" label="Name" value={name ?? ''}
				           onChange={(e) => setName(e.target.value)}
				           required
				/>
				<FormControlLabel
					label="Commission"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'row',
					}}
					control={
						<Switch id="commission" value={commission ?? false}
						        onChange={(e) => setCommission(e.target.checked)}/>
					}
				/>
				{spaceship ? updateRows : ''}
				<Button variant="outlined" type="submit">{spaceship ? 'Update' : 'Register'}</Button>
			</Box>
		</>
	);
};
