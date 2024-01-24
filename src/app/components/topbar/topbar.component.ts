import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BadgeComponent } from '../badge/badge.component';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModalComponent } from '../avatar-modal/avatar-modal.component';

@Component({
	selector: 'app-topbar',
	standalone: true,
	imports: [
		ToolbarModule,
		InputTextModule,
		BadgeComponent,
		MenubarModule,
		AvatarModule,
		TabViewModule,
		SidebarComponent,
		AvatarModalComponent
	],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
	visible: boolean = false;

	position: string = '';

	showDialog(): void {
		this.position = 'top-right';
		this.visible = true;
	}
}
