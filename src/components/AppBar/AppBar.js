import { AppBar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { TemporaryDrawer } from '../Drawer';

export const ButtonAppBar = ({ title }) => {
	const [open, setOpen] = useState(false);

	const list = (
		<Box
			sx={{ width: 250 }}
			role='presentation'
			onClick={() => setOpen(false)}
			onKeyDown={() => setOpen(false)}
		>
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
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