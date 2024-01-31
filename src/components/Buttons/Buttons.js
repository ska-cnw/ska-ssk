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

export const CopyButtonWithText = ({ copyString, fontSize, width }) => {
	return (
		<Paper
			component='form'
			sx={{
				width: width,
				p: '5px',
				display: 'flex', 
				alignItems: 'center',
				bgcolor: '#222222'
			}}
		>
			<Paper
				sx={{
					width: width - 50,
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