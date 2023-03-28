import { ILink } from '@/interfaces/link.interface';
import axios from 'axios';
import { useId } from 'react';
import nextId from 'react-id-generator';

const Base_API = process.env.API_URL;

axios.defaults.baseURL = Base_API;

export const linkService = {
	// async getLink(id: number | string) {
	// 	const { data } = await axios.get<ILink[]>('/links', {
	// 		params: { id }
	// 	});
	// 	console.log(data);

	// 	return data[0];
	// },
	async getLink(id: number | string) {
		const { data } = await axios.get<ILink>(`/links?id=${id}`);
		console.log(data);
		return data;
	},
	async getAll() {
		const { data } = await axios.get<ILink[]>('/links');
		return data;
	},
	async addNew(link: string) {
		const id = nextId('opa');
		const { data } = await axios.post<ILink>('/links', {
			id,
			link
		});
		console.log(data);

		return data;
	}
};
