import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { SortableContainer } from './SortableContainer';
import { Box, Button } from '@mui/material';
import { DraggingItem } from './DraggingItem';

export const Container = () => {
	const [items, setItems] = useState({
		container1: ['Cheese Pizza', 'Veggie Pizza', 'Pepperoni Pizza'],
		container2: ['Meat Pizza', 'Margherita Pizza', 'BBQ Chicken Pizza'],
		container3: ['Hawaiian Pizza', 'Buffalo Pizza', 'Supreme Pizza'],
		container4: ['The Works Pizza'],
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
			items[key].includes(id.toString())
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
			const activeItems = prev[activeContainer];
			const overItems = prev[overContainer];

			const activeIndex = activeItems.indexOf(id);
			const overIndex = overItems.indexOf(overId.toString());

			let newIndex;
			if (overId in prev) {
				newIndex = overItems.length + 1;
			} else {
				const isBelowLastItem = over && overIndex === overItems.length - 1;

				const modifier = isBelowLastItem ? 1 : 0;

				newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
			}

			return {
				...prev,
				[activeContainer]: [
					...prev[activeContainer].filter((item) => item !== active.id),
				],
				[overContainer]: [
					...prev[overContainer].slice(0, newIndex),
					items[activeContainer][activeIndex],
					...prev[overContainer].slice(newIndex, prev[overContainer].length),
				],
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

		const activeIndex = items[activeContainer].indexOf(id);
		const overIndex = items[overContainer].indexOf(overId.toString());

		if (activeIndex !== overIndex) {
			setItems((items) => ({
				...items,
				[overContainer]: arrayMove(
					items[overContainer],
					activeIndex,
					overIndex
				),
			}));
		}
	};

	const [count, setCount] = useState(1);

	const handleAddItem = () => {
		setItems((prev) => {
			prev['container1'].push('ttest' + count);
			setCount(count + 1);

			return ({
				...prev, container1: prev['container1']
			});
		});
	};

	const handleDeleteItem = (id) => {
		const deleteContainer = findContainer(id);

		setItems((prev) => {
			return ({
				...prev,
				[deleteContainer]: [
					...prev[deleteContainer].filter((item) => item !== id)
				],
			});
		});
	};

	const handleChangeItem = (id) => {
		const changeContainer = findContainer(id);
		const changeIndex = items[changeContainer].indexOf(id);

		setItems((prev) => {
			prev[changeContainer][changeIndex] = 'ttest';
			console.log(prev)

			return ({...prev});
		})
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', m: 2 }}>
			<Button sx={{ height: 30 }} variant='outlined' onClick={handleAddItem} >add</Button>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				{containers.map((containerId) => (
					<SortableContainer
						key={containerId}
						id={containerId}
						label={containerId}
						items={items[containerId]}
						onDelete={handleDeleteItem}
						onChange={handleChangeItem}
					/>
				))}
				{/* <SortableContainer
					id='container1'
					items={items.container1}
					label='menu1'
					onDelete={handleDeleteItem}
				/>
				<SortableContainer
					id='container2'
					items={items.container2}
					label='menu2'
					onDelete={handleDeleteItem}
				/>
				<SortableContainer
					id='container3'
					items={items.container3}
					label='menu3'
					onDelete={handleDeleteItem}
				/>
				<SortableContainer
					id='container4'
					items={items.container4}
					label='menu4'
					onDelete={handleDeleteItem}
				/> */}

				<DragOverlay dropAnimation={{ duration: 0 }}>
					<DraggingItem />
				</DragOverlay>
			</DndContext>
		</Box>
	);
};