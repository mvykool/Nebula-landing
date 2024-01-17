import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
@Component({
	selector: 'app-topbar',
	standalone: true,
	imports: [ToolbarModule, AvatarModule, TabViewModule],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss'
})
export class TopbarComponent {}
