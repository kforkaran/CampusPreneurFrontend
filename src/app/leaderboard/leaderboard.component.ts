import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LeaderboardService } from './leaderboard.service';

@Component({
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
    isLoading = true;
    users: User[];
    constructor(private leaderboardService: LeaderboardService) { }

    ngOnInit() {
        this.leaderboardService.getUsers()
            .subscribe(result => {
                this.users = result;
                this.isLoading = false;
                console.log(result);
            }, err => {
                console.log(err);
            });
    }
}
