import { Component } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';

@Component({
	selector: 'app-avatar-modal',
	standalone: true,
	imports: [OverlayPanelModule, AvatarModule],
	templateUrl: './avatar-modal.component.html',
	styleUrl: './avatar-modal.component.scss'
})
export class AvatarModalComponent {}
