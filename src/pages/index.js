import { CopyButtonTooltip } from '@/components';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Team yakiniku</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<br />
				<br />
				<br />
				<CopyButtonTooltip copyString='Copied!' fontSize='small' />
			</main>
		</>
	);
};