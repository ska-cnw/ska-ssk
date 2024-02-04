import { Box } from '@mui/material';
import { SidebarItems } from './SidebarItems';

export const Sidebar = ({ width, headerHeight, iconColor }) => {
	return (
		<Box sx={{ position: 'fixed', top: headerHeight, width: width }}>
			<SidebarItems color={iconColor} onlyIcon={true} />
		</Box>
	);
};