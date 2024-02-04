import { Drawer } from '@mui/material';
import React from 'react';

export const TemporaryDrawer = ({ open, setOpen, list }) => {
	return (
		<div>
			<Drawer
				anchor='left'
				open={open}
				onClose={() => setOpen(false)}
				sx={{ zIndex: 0 }}
				PaperProps={{ sx: { bgcolor: 'skyblue' } }}
			>
				{list}
			</Drawer>
		</div>
	);
};