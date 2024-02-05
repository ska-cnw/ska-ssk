import { Box } from '@mui/material';

export const Item = ({ id }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 1, borderColor: 'blue', m: 1 }}>
			{id}
		</Box>
	);
};