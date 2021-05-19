import { BlogModel, CategoryModel } from "..";

export interface HeaderModel {
	categories: CategoryModel[],
	blogs: BlogModel[],
	informationWeb: InfoHeaderModel;
}
export interface InfoHeaderModel {
	address: string, phone: string, email: string, fax: string, logo: string, title: string, description: string;
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
