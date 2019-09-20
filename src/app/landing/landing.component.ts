import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    isAuthenticated = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.isAuthenticated = this.authService.getIsAuth();
        if (this.isAuthenticated) {
            this.router.navigate(['/dashboard', localStorage.getItem('userName')]);
        }
    }
}
