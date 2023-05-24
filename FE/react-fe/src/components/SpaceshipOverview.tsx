import {DataGrid, GridColDef, GridRowModel, GridToolbar} from '@mui/x-data-grid';
import {atom, useAtom} from 'jotai';
import {ajax} from 'rxjs/ajax';
import {catchError, EMPTY} from 'rxjs';
import {toast} from 'react-toastify';
import React, {useCallback, useEffect} from 'react';
import {Box, Button} from '@mui/material';
import {tokenAtom} from '../App';
import {Spaceship} from '../models/entities/spaceship';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const overviewSpaceships = atom<Spaceship[]>([]);

const columns: GridColDef[] = [
	{field: 'name', headerName: 'Name', flex: 1},
	{
		field: 'commission',
		headerName: 'Commission',
		width: 125,
		valueGetter: (params) => {
			return params.value ? '✔️' : '❌';
		},
	},
	{
		field: 'id',
		headerName: 'Action',
		width: 125,
		sortable: false,
		filterable: false,
		disableExport: true,
		renderCell: (params) => {
			return (
				<SpaceshipRowButtons id={params.value} row={params.row}>Edit</SpaceshipRowButtons>
			);
		},
	},
];

const spaceshipRowButtonsPropTypes = {
	children: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	row: PropTypes.object.isRequired as PropTypes.Validator<GridRowModel<Spaceship>>,
};

type SpaceshipRowButtonsProps = PropTypes.InferProps<typeof spaceshipRowButtonsPropTypes>;

const SpaceshipRowButtons = ({children, id, row}: SpaceshipRowButtonsProps) => {
	const [token] = useAtom(tokenAtom);
	const [spaceships, setSpaceships] = useAtom(overviewSpaceships);
	const navigate = useNavigate();
	
	const deleteSpaceship = () => {
		ajax<void>(
			{
				url: `${process.env.REACT_APP_API_URL}/spaceship/${id}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.pipe(catchError((err) => {
				toast.error('Failed to delete spaceship');
				console.error(err);
				return EMPTY;
			}))
			.subscribe(() => {
				toast.success('Spaceship deleted');
				setSpaceships(spaceships.filter((s) => s.id !== id));
			});
	};
	
	return (
		<>
			<Box sx={{display: 'flex', flexDirection: 'column'}}>
				<Button variant="contained" sx={{mb: 1}} onClick={() => navigate(`/spaceship/${id}`)}>Edit</Button>
				<Button variant="contained" color="error" onClick={deleteSpaceship}>Delete</Button>
			</Box>
		</>
	);
};

export const SpaceshipOverview = () => {
	const [token] = useAtom(tokenAtom);
	const [spaceships, setSpaceships] = useAtom(overviewSpaceships);
	
	const fetchSpaceships = useCallback(() => {
		ajax<Spaceship[]>(
			{
				url: `${process.env.REACT_APP_API_URL}/spaceship/list/user`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.pipe(catchError((err) => {
				toast.error('Failed to load spaceships');
				console.error(err);
				return EMPTY;
			}))
			.subscribe((res) => {
				setSpaceships(res.response);
			});
	}, [setSpaceships, token]);
	
	useEffect(() => {
		fetchSpaceships();
	}, [fetchSpaceships]);
	
	return (
		<>
			
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<DataGrid
					rows={spaceships}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {page: 0, pageSize: 5},
						},
					}}
					rowHeight={100}
					pageSizeOptions={[5, 10]}
					slots={{toolbar: GridToolbar}}
					sx={{minWidth: {xs: 0, md: '25%'}}}
				/>
			</Box>
		</>
	);
};
