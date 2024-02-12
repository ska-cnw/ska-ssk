import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';

export const SortableItem = ({ id, onDelete, onChange }) => {
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
					width: 250,
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

				<IconButton onClick={onChange} sx={{ p: 0 }}>
					<EditIcon sx={{ fontSize: 10 }} />
				</IconButton>
				<IconButton onClick={onDelete} sx={{ p: 0 }}>
					<ClearIcon sx={{ fontSize: 10 }} />
				</IconButton>
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