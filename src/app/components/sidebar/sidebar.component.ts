import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, SidebarModule, ButtonModule],
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
	iconMapping = {
		home: 'pi pi-home',
		products: 'pi pi-shopping-bag',
		orders: 'pi pi-truck',
		promotion: 'pi pi-tags',
		contact: 'pi pi-inbox',
		settings: 'pi pi-wrench',
		more: 'pi pi-sliders-h'
	};

	sidebarVisible: boolean = false;
}
