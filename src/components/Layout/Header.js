import { useState } from 'react';
import { Box } from '@mui/material';
import { ButtonAppBar } from '../AppBar';
import { SidebarItems } from './SidebarItems';

export const Header = ({ title, headerHeight, iconColor }) => {
	const [open, setOpen] = useState(false);

	const list = (
		<Box
			sx={{ width: 200 }}
			role='presentation'
			onClick={() => setOpen(false)}
			onKeyDown={() => setOpen(false)}
		>
			<Box height={headerHeight} />
			<SidebarItems color={iconColor} onlyIcon={false} />
		</Box>
	);

	return (
		<ButtonAppBar title={title} open={open} setOpen={setOpen} list={list} />
	);
};