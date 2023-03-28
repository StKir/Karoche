import { IErrorLink, ILink, ISingleLink } from '@/interfaces/link.interface';
import { linkService } from '@/service/addService';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';

const ItemPage: NextPage<ISingleLink | IErrorLink> = ({ link }) => {
	const { replace } = useRouter();
	useEffect(() => {
		if (link !== 'error') {
			replace(link.link.toString());
		}
	}, []);
	return (
		<div className='container'>
			<div
				className='redirect'
				style={{
					textAlign: 'center'
				}}
			>
				{link === 'error' ? (
					<h1>Ссылки не существует(</h1>
				) : (
					<h1>Скоро вы будете перенаправлены!</h1>
				)}
			</div>
		</div>
	);
};

interface Params extends ParsedUrlQuery {
	id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const links = await linkService.getAll();

	return {
		paths: links.map((link) => ({
			params: {
				id: link.id.toString()
			}
		})),
		fallback: 'blocking'
	};
};

export const getStaticProps: GetStaticProps<ISingleLink | IErrorLink> = async ({
	params
}) => {
	const link = await linkService.getLink(String(params?.id));
	if (link) {
		return {
			props: { link },
			revalidate: 20
		};
	} else {
		return {
			props: { link: 'error' }
		};
	}
};

export default ItemPage;
