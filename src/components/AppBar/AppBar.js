import { AppBar, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { TemporaryDrawer } from '../Drawer';
import Link from 'next/link';

export const ButtonAppBar = ({ title }) => {
	const [open, setOpen] = useState(false);

	const item = (icon, text, link) => (
		<ListItem disablePadding>
			<Link href={link}>
				<ListItemButton>
					<ListItemIcon>
						{icon}
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItemButton>
			</Link>
		</ListItem>
	);

	const list = (
		<Box
			sx={{ width: 250 }}
			role='presentation'
			onClick={() => setOpen(false)}
			onKeyDown={() => setOpen(false)}
		>
			<List>
				{item(<KebabDiningIcon />, 'yakiniku1', '/')}
				{item(<RamenDiningIcon />, 'yakiniku2', '/yakiniku2')}
				{item(<LunchDiningIcon />, 'yakiniku3', '/yakiniku3')}
			</List>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						sx={{ mr: 2 }}
						onClick={() => setOpen(true)}
					>
						<MenuIcon />
					</IconButton>
					<TemporaryDrawer open={open} setOpen={setOpen} list={list} />
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						{title}
					</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</Box>
	);
};