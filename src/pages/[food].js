import { CopyButtonWithText, Layout } from '@/components';
import { Container } from '@/components/DragAndDrop';
import { Box } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

export const getServerSideProps = async (context) => {
	return {
		props: {
			title: context.query.food,
		},
	};
};

const Food = ({ title }) => {
	return (
		<>
			<Head>
				<title>Team yakiniku</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout title={title}>
				<Box height={50} bgcolor='gray' />
				<Box height={50} bgcolor='darkcyan' />
				<Box height={50} bgcolor='lightsteelblue' />
				<CopyButtonWithText copyString={title} fontSize='small' width={300} />

				<Container />

				<Link href='/'>Go Home</Link>
			</Layout>
		</>
	);
};

export default Food;