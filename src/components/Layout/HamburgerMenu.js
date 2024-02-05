import { useState } from 'react';
import { Box, Drawer, IconButton } from '@mui/material';
import { SidebarItems } from './SidebarItems';
import MenuIcon from '@mui/icons-material/Menu';

export const HamburgerMenu = ({ height, iconColor }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<IconButton
				size='large'
				edge='start'
				color='inherit'
				sx={{ mr: 2 }}
				onClick={() => setOpen(!open)}
			>
				<MenuIcon />
			</IconButton>

			<Drawer
				anchor='left'
				open={open}
				onClose={() => setOpen(false)}
				sx={{ zIndex: 0 }}
				PaperProps={{ sx: { bgcolor: 'skyblue' } }}
			>
				<Box
					sx={{ width: 200 }}
					role='presentation'
					onClick={() => setOpen(false)}
					onKeyDown={() => setOpen(false)}
				>
					<Box height={height} />
					<SidebarItems color={iconColor} onlyIcon={false} />
				</Box>
			</Drawer>
		</>
	);
};