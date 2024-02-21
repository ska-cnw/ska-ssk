import Head from 'next/head';
import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';
import { Layout } from '@/components';

export const getServerSideProps = async () => {
	const allPostsData = getSortedPostsData();

	return {
		props: {
			allPostsData,
		},
	};
};

const LinkList = ({ allPostsData }) => {
	return (
		<>
			<Head>
				<title>Team yakiniku</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout title='議事録'>
				<section>
					<div>
						{allPostsData.map(({ id, date, title }) => (
							<li key={id}>
								<Link href={`/posts/${id}`}>{title} ({date})</Link>
							</li>
						))}
					</div>
				</section>
			</Layout>
		</>
	);
};

export default LinkList;