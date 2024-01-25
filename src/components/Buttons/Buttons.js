import { IconButton, Paper, Tooltip } from '@mui/material';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const CopyButtonTooltip = ({ copyString, fontSize }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);

		navigator.clipboard.writeText(copyString);
	};

	return (
		<Tooltip
			title='Copied!'
			arrow
			placement='top'
			open={open}
			onClick={handleClick}
			onClose={() => setOpen(false)}
		>
			<IconButton>
				<ContentCopyIcon fontSize={fontSize} sx={{ color: 'gray' }} />
			</IconButton>
		</Tooltip>
	);
};

export const CopyButtonWithText = ({ copyString, fontSize }) => {
	return (
		<Paper
			component='form'
			sx={{
				width: 400,
				p: '5px',
				display: 'flex', 
				alignItems: 'center',
				bgcolor: '#222222'
			}}
		>
			<Paper
				sx={{
					width: 350,
					p: '5px',
					bgcolor: '#222222',
					color: 'white'
				}}
			>
				{copyString}
			</Paper>
			<CopyButtonTooltip copyString={copyString} fontSize={fontSize} />
		</Paper>
	);
};