import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Location } from '@angular/common';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    constructor(private authService: AuthService, private location: Location) { }
    ngOnInit() {
        if (!this.authService.user) {
            this.authService.getUser()
                .subscribe(result => {
                    if (result.user) {
                        this.authService.user = result.user;
                        this.location.replaceState('/dashboard/' + result.user.userName);
                    }
                }, err => {
                    console.log(err);
                });
        } else {
            this.location.replaceState('/dashboard/' + this.authService.user.userName);
        }
    }
}
