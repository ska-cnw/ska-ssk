import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box } from '@mui/material';

export const SortableItem = ({ id }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging, setActivatorNodeRef } = useSortable({ id });

	return (
		<div
			ref={setNodeRef}
			style={{ transform: CSS.Transform.toString(transform), transition }}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					bgcolor: '#FFFFAA',
					border: 1,
					borderWidth: '1px 1px 1px 10px',
					borderColor: 'black black black purple',
					borderRadius: 5,
					width: 200,
					height: 30,
					m: 0.3,
					p: 0.2,
					opacity: isDragging ? 0.5 : 1
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
					{id}
				</Box>

				<Box
					ref={setActivatorNodeRef}
					{...attributes}
					{...listeners}
					sx={{
						cursor: isDragging ? 'grabbing' : 'grab',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						color: 'darkgray',
				}}
				>
					<DragIndicatorIcon fontSize='small' />
				</Box>
			</Box>
		</div>
	);
};