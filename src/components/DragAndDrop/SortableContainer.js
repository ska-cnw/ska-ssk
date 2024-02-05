import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Box } from '@mui/material';

export const SortableContainer = ({ id, items, label }) => {
	const { setNodeRef } = useDroppable({ id });

	return (
		<Box sx={{ m: 2 }}>
			<h3>{label}</h3>
			<SortableContext id={id} items={items} strategy={rectSortingStrategy}>
				<Box ref={setNodeRef} sx={{ bgcolor: 'gray', p: 1 }}>
					{items.map((id) => (
						<SortableItem key={id} id={id} />
					))}
				</Box>
			</SortableContext>
		</Box>
	);
};