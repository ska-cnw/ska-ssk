import { ButtonAppBar, CopyButtonWithText } from '@/components';
import { Checkbox, FormControlLabel } from '@mui/material';
import Head from 'next/head';
import { parseCookies, setCookie } from 'nookies';
import { useState } from 'react';

export const getServerSideProps = async (ctx) => {
	const cookies = parseCookies(ctx);

	const settings = {
		isChecked1: cookies.isChecked1 === 'true' ? true : false,
		isChecked2: cookies.isChecked2 === 'true' ? true : false,
		isChecked3: cookies.isChecked3 === 'true' ? true : false,
	};
	
	return {
		props: {
			settings: settings,
		},
	};
};

export default function Home({ settings }) {
	const [checks, setchecks] = useState({
		isChecked1: settings.isChecked1,
		isChecked2: settings.isChecked2,
		isChecked3: settings.isChecked3,
	});

	const handleChange = (key) => (e) => {
		const checked = e.target.checked;
		setchecks({ ...checks, [key]: checked });
		setCookie(null, key, checked);
	};

	const checkSet = [
		{ isChecked: checks.isChecked1, label: 'isChecked1' },
		{ isChecked: checks.isChecked2, label: 'isChecked2' },
		{ isChecked: checks.isChecked3, label: 'isChecked3' },
	];

	return (
		<>
			<Head>
				<title>Team yakiniku</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<ButtonAppBar title='yakiniku1' />

			<main>
				{checkSet.map((data, index) => (
					<FormControlLabel
						key={index}
						control={<Checkbox checked={data.isChecked} onChange={handleChange(data.label)} />}
						label={data.label}
					/>
				))}
				<br />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
			</main>
		</>
	);
};