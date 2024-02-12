import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const SortableContainer = ({ id, items, label, onDelete, onChange, onAdd }) => {
	const { setNodeRef } = useDroppable({ id });

	return (
		<Box
			sx={{
				m: 1,
				p: 2,
				width: 300,
				minHeight: 200,
				bgcolor: '#C0C0C0',
				borderRadius: 5,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					color: 'black',
					bgcolor: '#CEF9DC',
					borderRadius: 5
				}}
			>
				<Typography variant='h6' sx={{ flexGrow: 1, ml: 2, fontWeight: 'bold' }}>
					{label}
				</Typography>
				{onAdd ? 
					<IconButton onClick={() => onAdd(id)}>
						<AddIcon sx={{ fontSize: 15 }} />
					</IconButton>
				: undefined}
			</Box>

			<SortableContext id={id} items={items} strategy={rectSortingStrategy}>
				<Box
					ref={setNodeRef}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						bgcolor: 'inherit',
						p: 1,
					}}
				>
					{items.map((id) => (
						<SortableItem key={id} id={id} onDelete={() => onDelete(id)} onChange={() => onChange(id)} />
					))}
				</Box>
			</SortableContext>
		</Box>
	);
};