import {Box, Tab, Tabs, Typography} from '@mui/material';
import {ReactNode, SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {Engine} from '../models/entities/components/engine';
import {Core} from '../models/entities/components/core';
import {LifeSupportUnit} from '../models/entities/components/life-support-unit';
import {useAtom} from 'jotai';
import {tokenAtom} from '../App';
import {ajax} from 'rxjs/ajax';
import {catchError, EMPTY} from 'rxjs';
import {toast} from 'react-toastify';
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';

const coresColumns: GridColDef[] = [
	{field: 'name', headerName: 'Name', flex: 1},
	{field: 'powerConsumption', headerName: 'Power Consumption', flex: 1},
	{field: 'computationPower', headerName: 'Computation Power', flex: 1},
	{
		field: 'fullyConscious',
		headerName: 'Fully Conscious',
		flex: 1,
		valueGetter: (params) => {
			return params.value ? '✔️' : '❌';
		},
	},
	{
		field: 'helmControl',
		headerName: 'Helm Control',
		flex: 1,
		valueGetter: (params) => {
			return params.value ? '✔️' : '❌';
		},
	},
];

const enginesColumns: GridColDef[] = [
	{field: 'name', headerName: 'Name', flex: 1},
	{field: 'powerConsumption', headerName: 'Power Consumption', flex: 1},
	{field: 'acceleration', headerName: 'Acceleration', flex: 1},
	{field: 'maxSpeed', headerName: 'Max Speed', flex: 1},
];

const lifeSupportUnitsColumns: GridColDef[] = [
	{field: 'name', headerName: 'Name', flex: 1},
	{field: 'powerConsumption', headerName: 'Power Consumption', flex: 1},
	{field: 'passengerCapacity', headerName: 'Passenger Capacity', flex: 1},
];

export const ComponentsOverview = () => {
	const [token] = useAtom(tokenAtom);
	const [value, setValue] = useState(0);
	
	const [cores, setCores] = useState<Core[]>([]);
	const [engines, setEngines] = useState<Engine[]>([]);
	const [lifeSupportUnits, setLifeSupportUnits] = useState<LifeSupportUnit[]>([]);
	
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	
	const fetchComponents = useCallback(() => {
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
	}, [token, setCores, setEngines, setLifeSupportUnits]);
	
	useEffect(() => {
		fetchComponents();
	}, [fetchComponents]);
	
	return (
		<>
			<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
				<Tabs value={value} onChange={handleChange} aria-label="Components tabs" centered>
					<Tab label="Cores" {...a11yProps(0)} />
					<Tab label="Engines" {...a11yProps(1)} />
					<Tab label="Life Support Units" {...a11yProps(2)} />
				</Tabs>
			</Box>
			
			<TabPanel value={value} index={0}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<DataGrid
						rows={cores}
						columns={coresColumns}
						initialState={{
							pagination: {
								paginationModel: {page: 0, pageSize: 5},
							},
						}}
						pageSizeOptions={[5, 10]}
						sx={{minWidth: '50%'}}
						slots={{toolbar: GridToolbar}}
					/>
				</Box>
			</TabPanel>
			
			<TabPanel value={value} index={1}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<DataGrid
						rows={engines}
						columns={enginesColumns}
						initialState={{
							pagination: {
								paginationModel: {page: 0, pageSize: 5},
							},
						}}
						pageSizeOptions={[5, 10]}
						sx={{minWidth: '50%'}}
						slots={{toolbar: GridToolbar}}
					/>
				</Box>
			</TabPanel>
			
			<TabPanel value={value} index={2}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<DataGrid
						rows={lifeSupportUnits}
						columns={lifeSupportUnitsColumns}
						initialState={{
							pagination: {
								paginationModel: {page: 0, pageSize: 5},
							},
						}}
						pageSizeOptions={[5, 10]}
						sx={{minWidth: '50%'}}
						slots={{toolbar: GridToolbar}}
					/>
				</Box>
			</TabPanel>
		</>
	);
};

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

const TabPanel = (props: TabPanelProps) => {
	const {children, value, index, ...other} = props;
	
	return (
		<>
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{p: 3}}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		</>
	);
};

const a11yProps = (index: number) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};