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
			lists: ['Cheese Pizza'],
		},
		container2: {
			label: 'Category1',
			lists: ['Veggie Pizza', 'Pepperoni Pizza', 'Meat Pizza', 'Shoyu Ramen', 'Shio Ramen'],
		},
		container3: {
			label: 'Category2',
			lists: ['Margherita Pizza', 'BBQ Chicken Pizza', 'Hawaiian Pizza', 'Miso Ramen', 'Tonkotsu Ramen'],
		},
		container4: {
			label: 'Category3',
			lists: ['Buffalo Pizza', 'Supreme Pizza', 'The Works Pizza', 'Taiwan Ramen', 'Onomichi Ramen', 'Okinawa Soba', 'Nagasaki Champon'],
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

	const handleOpenChangeDialog = (id, oldId) => {
		setChangeOpen(true);
		setActiveContainerId(id);
		setOldItem(oldId);
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

	const handleChangeItem = (containerId, oldId, newId) => {
		const changeIndex = items[containerId].lists.indexOf(oldId);

		setItems((prev) => {
			prev[containerId].lists[changeIndex] = newId;

			return ({ ...prev });
		});

		setChangeOpen(false);
	};

	const [open, setOpen] = useState(false);
	const [changeOpen, setChangeOpen] = useState(false);
	const [newItem, setNewItem] = useState('');
	const [oldItem, setOldItem] = useState('');

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', m: 2 }}>
			<NewItemDialog
				open={open}
				onClose={() => setOpen(false)}
				onUpdateText={(e) => setNewItem(e.target.value)}
				onClickOk={() => handleAddItem(activeContainerId, newItem)}
			/>
			<NewItemDialog
				open={changeOpen}
				onClose={() => setChangeOpen(false)}
				onUpdateText={(e) => setNewItem(e.target.value)}
				onClickOk={() => handleChangeItem(activeContainerId, oldItem, newItem)}
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
						containerId={containerId}
						label={items[containerId].label}
						items={items[containerId].lists}
						onDelete={handleDeleteItem}
						onChange={handleOpenChangeDialog}
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