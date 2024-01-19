import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
	selector: 'app-breadcrumb',
	standalone: true,
	imports: [BreadcrumbModule],
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
	items: MenuItem[] | undefined;

	home: MenuItem | undefined;

	ngOnInit(): void {
		this.items = [
			{ label: 'Computer' },
			{ label: 'Notebook' },
			{ label: 'Accessories' },
			{ label: 'Backpacks' },
			{ label: 'Item' }
		];

		this.home = { icon: 'pi pi-home', routerLink: '/' };
	}
}
