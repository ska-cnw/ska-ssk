import { Box } from '@mui/material';

export const Item = ({ id }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				color: 'black',
				bgcolor: '#FFFFAA',
				border: 1,
				borderWidth: '1px 1px 1px 10px',
				borderColor: 'black black black purple',
				width: 200,
				m: 0.3,
				p: 0.2
			}}
		>
			{id}
		</Box>
	);
};