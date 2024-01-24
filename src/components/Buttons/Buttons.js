import { IconButton, Tooltip } from '@mui/material';
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
			title='nabe pa'
			arrow
			placement='top'
			open={open}
			onClick={handleClick}
			onClose={() => setOpen(false)}
		>
			<IconButton>
				<ContentCopyIcon fontSize={fontSize} />
			</IconButton>
		</Tooltip>
	);
};