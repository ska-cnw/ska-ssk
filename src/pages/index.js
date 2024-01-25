import { CopyButtonWithText } from '@/components';
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
				<CopyButtonWithText copyString='sana' fontSize='small' />
				<CopyButtonWithText copyString='yama' fontSize='small' />
			</main>
		</>
	);
};