import { Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export const DraggingItem = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				borderRadius: 1.5,
				width: 250,
				height: 30,
				m: 0.3,
				p: 0.2
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					flexGrow: 1,
					color: 'black',
				}}
			>
				{null}
			</Box>

			<Box
				sx={{
					width: 30,
					height: 30,
					bgcolor: 'white',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'grabbing',
					color: 'black',
					borderRadius: '50%'
				}}
			>
				<DragIndicatorIcon />
			</Box>
		</Box>
	);
};