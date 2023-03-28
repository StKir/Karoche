export interface ILink {
	id: number | string;
	link: string;
}

export interface ISingleLink {
	link: ILink;
}

export interface IErrorLink {
	link: 'error';
}
