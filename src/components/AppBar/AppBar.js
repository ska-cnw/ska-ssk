import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { TemporaryDrawer } from '../Drawer';

export const ButtonAppBar = ({ title, open, setOpen, list }) => {
	return (
		<>
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						sx={{ mr: 2 }}
						onClick={() => setOpen(!open)}
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
		</>
	);
};