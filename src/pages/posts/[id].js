import Head from 'next/head';
import { getPostData } from '../../lib/posts';
import { Layout } from '@/components';

export const getServerSideProps = async ({ params }) => {
	const postData = await getPostData(params.id);

	return {
		props: {
			postData,
		},
	};
};

const Post = ({ postData }) => {
	return (
		<>
			<Head>
				<title>{postData.title}</title>
			</Head>

			<Layout title={postData.title}>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</Layout>
		</>
	);
};

export default Post;