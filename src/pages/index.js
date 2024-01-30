import { ButtonAppBar, CopyButtonWithText } from '@/components';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies, setCookie } from 'nookies';
import { useState } from 'react';

export const getServerSideProps = async (ctx) => {
	const cookies = parseCookies(ctx);

	const settings = {
		isChecked1: cookies.isChecked1 === 'true' ? true : false,
		isChecked2: cookies.isChecked2 === 'true' ? true : false,
		isChecked3: cookies.isChecked3 === 'true' ? true : false,
	};
	
	const query = ctx.query;

	const params = {
		param1: query.param1 !== undefined ? query.param1 : '',
		param2: query.param2 !== undefined ? query.param2 : '',
		param: query['param[]'] !== undefined ? query['param[]'] : '',
	};

	return {
		props: {
			settings: settings,
			params: params,
		},
	};
};

export default function Home({ settings, params }) {
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

	const queryParams = [
		{ label: 'cond0', query: '' },
		{ label: 'cond1', query: 'param1=123&param2=234' },
		{ label: 'cond2', query: 'param1=123&param2=234&param[]=1' },
		{ label: 'cond3', query: 'param1=123&param2=234&param[]=1&param[]=2' },
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
				{queryParams.map((q, i) => (
					<Link href={{ pathname: '/', query: q.query }}>
						<Button variant='outlined'>{q.label}</Button>
					</Link>
				))}
				<br />
				param1: {params.param1}
				<br />
				param2: {params.param2}
				<br />
				{(typeof(params.param) === 'object')
					? params.param.map((param, index) => (
						<div key={param}>
							param[{index}]: {param}
						</div>
					))
					: <div>param[0]: {params.param[0]}</div>
				}
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