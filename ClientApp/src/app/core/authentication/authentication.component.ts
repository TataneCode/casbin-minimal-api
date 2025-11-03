import { Component, ChangeDetectionStrategy } from '@angular/core';

// Authentication feature component
@Component({
    selector: 'app-authentication',
    standalone: true,
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent {}
