import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { SortableContainer } from './SortableContainer';
import { Box } from '@mui/material';
import { DraggingItem } from './DraggingItem';
import { NewItemDialog } from './NewItemDialog';

export const Container = () => {
	const [items, setItems] = useState({
		container1: {
			label: '未割当',
			lists: ['Cheese Pizza', 'Veggie Pizza', 'Pepperoni Pizza'],
		},
		container2: {
			label: 'menu2',
			lists: ['Meat Pizza', 'Margherita Pizza', 'BBQ Chicken Pizza'],
		},
		container3: {
			label: 'menu3',
			lists: ['Hawaiian Pizza', 'Buffalo Pizza', 'Supreme Pizza'],
		},
		container4: {
			label: 'menu4',
			lists: ['The Works Pizza'],
		},
	});

	const [containers, setContainers] = useState(Object.keys(items));

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const findContainer = (id) => {
		if (id in items) {
			return id;
		}
		return Object.keys(items).find((key) => (
			items[key].lists.includes(id.toString())
		));
	};

	const handleDragOver = (e) => {
		const { active, over } = e;
		const id = active.id.toString();
		const overId = over?.id;

		if (!overId) return;

		const activeContainer = findContainer(id);
		const overContainer = findContainer(over?.id);

		if (
			!activeContainer ||
			!overContainer ||
			activeContainer === overContainer
		) {
			return;
		}

		setItems((prev) => {
			const activeLists = prev[activeContainer].lists;
			const overLists = prev[overContainer].lists;

			const activeIndex = activeLists.indexOf(id);
			const overIndex = overLists.indexOf(overId.toString());

			let newIndex;
			if (overId in prev) {
				newIndex = overLists.length + 1;
			} else {
				const isBelowLastItem = over && overIndex === overLists.length - 1;

				const modifier = isBelowLastItem ? 1 : 0;

				newIndex = overIndex >= 0 ? overIndex + modifier : overLists.length + 1;
			}

			return {
				...prev,
				[activeContainer]: {
					...prev[activeContainer],
					lists: [
						...activeLists.filter((item) => item !== active.id),
					],
				},
				[overContainer]: {
					...prev[overContainer],
					lists: [
						...overLists.slice(0, newIndex),
						items[activeContainer].lists[activeIndex],
						...overLists.slice(newIndex, prev[overContainer].length),
					],
				},
			};
		});
	};

	const handleDragEnd = (e) => {
		const { active, over } = e;
		const id = active.id.toString();
		const overId = over?.id;

		if (!overId) return;

		const activeContainer = findContainer(id);
		const overContainer = findContainer(over?.id);

		if (
			!activeContainer ||
			!overContainer ||
			activeContainer !== overContainer
		) {
			return;
		}

		const activeIndex = items[activeContainer].lists.indexOf(id);
		const overIndex = items[overContainer].lists.indexOf(overId.toString());

		if (activeIndex !== overIndex) {
			setItems((items) => ({
				...items,
				[overContainer]: {
					...items[overContainer],
					lists: arrayMove(
						items[overContainer].lists,
						activeIndex,
						overIndex
					),
				},
			}));
		}
	};

	const [activeContainerId, setActiveContainerId] = useState(undefined);

	const handleOpenAddDialog = (id) => {
		setOpen(true);
		setActiveContainerId(id);
	};

	const handleAddItem = (containerId, newId) => {
		setItems((prev) => {
			prev[containerId].lists.push(newId);

			return ({
				...prev,
				[containerId]: {
					...prev[containerId],
					lists: prev[containerId].lists,
				}
			});
		});

		setOpen(false);
	};

	const handleDeleteItem = (id) => {
		const deleteContainer = findContainer(id);

		setItems((prev) => {
			return ({
				...prev,
				[deleteContainer]: {
					...prev[deleteContainer],
					lists: [
						...prev[deleteContainer].lists.filter((item) => item !== id)
					],
				},
			});
		});
	};

	const handleChangeItem = (id) => {
		const changeContainer = findContainer(id);
		const changeIndex = items[changeContainer].lists.indexOf(id);

		setItems((prev) => {
			prev[changeContainer].lists[changeIndex] = 'ttest';

			return ({ ...prev });
		})
	}

	const [open, setOpen] = useState(false);
	const [newItem, setNewItem] = useState('');

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', m: 2 }}>
			<NewItemDialog
				open={open}
				onClose={() => setOpen(false)}
				onUpdateText={(e) => setNewItem(e.target.value)}
				onClickOk={() => handleAddItem(activeContainerId, newItem)}
			/>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				{containers.map((containerId, index) => (
					<SortableContainer
						key={containerId}
						id={containerId}
						label={items[containerId].label}
						items={items[containerId].lists}
						onDelete={handleDeleteItem}
						onChange={handleChangeItem}
						onAdd={index === 0 ? handleOpenAddDialog : undefined}
					/>
				))}

				<DragOverlay dropAnimation={{ duration: 0 }}>
					<DraggingItem />
				</DragOverlay>
			</DndContext>
		</Box>
	);
};