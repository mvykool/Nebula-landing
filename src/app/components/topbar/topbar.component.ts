import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
	selector: 'app-topbar',
	standalone: true,
	imports: [ToolbarModule, MenubarModule, AvatarModule, TabViewModule, SidebarComponent],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
	items: MenuItem[] | undefined;

	ngOnInit(): void {
		this.items = [
			{
				label: 'Menu',
				icon: '',
				items: [
					{
						label: 'New',
						icon: 'pi pi-fw pi-plus',
						items: [
							{
								label: 'Bookmark',
								icon: 'pi pi-fw pi-bookmark'
							},
							{
								label: 'Video',
								icon: 'pi pi-fw pi-video'
							}
						]
					},
					{
						label: 'Delete',
						icon: 'pi pi-fw pi-trash'
					},
					{
						separator: true
					},
					{
						label: 'Export',
						icon: 'pi pi-fw pi-external-link'
					}
				]
			}
		];
	}
}
