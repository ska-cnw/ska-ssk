import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Box } from '@mui/material';

export const SortableContainer = ({ id, items, label, onDelete, onChange }) => {
	const { setNodeRef } = useDroppable({ id });

	return (
		<Box sx={{ m: 2 }}>
			<h3>{label}</h3>
			<SortableContext id={id} items={items} strategy={rectSortingStrategy}>
				<Box
					ref={setNodeRef}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						bgcolor: '#cccccc',
						width: 250,
						minHeight: 100,
						p: 1
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