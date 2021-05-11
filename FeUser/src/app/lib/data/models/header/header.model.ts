export interface HeaderModel {
    categories:any[];
    blogs:any[];
}
export interface InfoHeaderModel {
	informationWeb: {address:string, phone: string, email: string, fax: string, logo: string, title: string, description: string};
}
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}
