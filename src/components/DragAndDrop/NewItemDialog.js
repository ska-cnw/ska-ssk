import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export const NewItemDialog = (props) => {
	const {
		open,
		onClose,
		onUpdateText,
		onClickOk
	} = props;

	return (
		<Dialog open={open} onClose={onClose} PaperProps={{ component: 'form' }}>
			<DialogTitle>Input new item</DialogTitle>
			<DialogContent>
				<TextField autoFocus onBlur={onUpdateText} />
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onClickOk}>OK</Button>
			</DialogActions>
		</Dialog>
	);
};