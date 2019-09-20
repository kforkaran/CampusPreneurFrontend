import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class LeaderboardService {
    users: User[];
    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>('http://localhost:3000/users');
    }
}
