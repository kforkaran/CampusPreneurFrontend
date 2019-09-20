import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private authListenerSubscription: Subscription;
    userIsAuthenticated = false;
    userName;
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.userName = localStorage.getItem('userName');
        this.authListenerSubscription = this.authService.getAuthStateListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
    }

    onLogout() {
        localStorage.clear();
        this.authService.logoutUser();
    }

    ngOnDestroy() {
        this.authListenerSubscription.unsubscribe();
    }
}
