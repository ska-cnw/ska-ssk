import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { HamburgerMenu } from './HamburgerMenu';

export const Header = ({ title, height, iconColor }) => {
	return (
		<>
			<AppBar position='fixed'>
				<Toolbar>
					<HamburgerMenu height={height} iconColor={iconColor} />

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