import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BadgeComponent } from '../badge/badge.component';
import { InputTextModule } from 'primeng/inputtext';

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
		SidebarComponent
	],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss'
})
export class TopbarComponent {}
