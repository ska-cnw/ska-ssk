import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';

export const SortableItem = ({ id }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	return (
		<div
			ref={setNodeRef}
			style={{ transform: CSS.Transform.toString(transform), transition }}
			{...attributes}
			{...listeners}
		>
			<Item id={id} />
		</div>
	);
};