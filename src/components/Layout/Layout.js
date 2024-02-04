import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = ({ title, children }) => {
	const headerHeight = 70;
	const sidebarWidth = 56;
	const iconColor = 'black';

	return (
		<Box display='flex' flexDirection='row'>
			<Box
				sx={{
					width: sidebarWidth,
					minHeight: '100vh',
					bgcolor: 'skyblue',
				}}
			>
				<Sidebar width={sidebarWidth} headerHeight={headerHeight} iconColor={iconColor} />
			</Box>

			<Box
				sx={{
					flexGrow: 1,
					bgcolor: '#9999FF',
					display: 'flex',
					flexDirection: 'column',
					p: 1,
				}}
			>
				<Header title={title} headerHeight={headerHeight} iconColor={iconColor} />

				{children}
			</Box>
		</Box>
	);
};