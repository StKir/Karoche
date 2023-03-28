// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ILink } from '@/interfaces/link.interface';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};

const db: ILink[] = [
	{
		id: 1,
		link: 'http://localhost:3000'
	},
	{
		id: 2,
		link: 'test2'
	}
];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ILink[] | ILink | string>
) {
	if (req.method === 'GET') {
		if (req.query.id) {
			const data = db.find((el) => el.id.toString() === req.query.id);
			data ? res.status(200).json(data) : res.status(404).json('error');
		} else {
			res.status(200).json(db);
		}
	}
	if (req.method === 'POST') {
		res.status(200).json(req.body);
		console.log('dsadsa');

		return;
	}
}
