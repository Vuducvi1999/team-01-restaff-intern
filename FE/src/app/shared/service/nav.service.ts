import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [

		{
			title: 'Suppliers', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/suppliers/list-suppliers', title: 'Supplier List', type: 'link' },
				{ path: '/suppliers/create-suppliers', title: 'Create Supplier', type: 'link' },
			]
		},
		{
			title: 'Banners', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/banners/list-banners', title: 'Banners List', type: 'link' },
				{ path: '/banners/create-banners', title: 'Create Banner', type: 'link' },
			]
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
