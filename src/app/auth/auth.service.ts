import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../models/user.model';
import { Question } from '../models/question.model';

@Injectable()
export class AuthService {
    private token: string;
    private authStateListener = new Subject<boolean>();
    private isAuthenticated = false;
    user: User;
    question: Question;

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStateListener() {
        return this.authStateListener.asObservable();
    }

    createUser(Username: string, Name: string, PhoneNumber: number, Password: string) {
        const userData: User = {
            userName: Username,
            name: Name,
            phoneNumber: PhoneNumber,
            password: Password,
            level: 1,
            timestamp: Date.now()
        };
        console.log(userData);
        this.http.post<{ message: string, user: User }>('http://localhost:3000/signup', userData)
            .subscribe(response => {
                console.log(response.message);
                this.user = response.user;
                this.router.navigate(['/login']);
            }, err => {
                console.log(err);
            });
    }

    loginUser(Username: string, Password: string) {
        const user = {
            userName: Username,
            password: Password
        };
        this.http.post<{ token: string, user: User }>('http://localhost:3000/login', user)
            .subscribe(result => {
                this.user = result.user;
                this.token = result.token;
                if (result.token) {
                    this.isAuthenticated = true;
                    this.authStateListener.next(true);
                    this.saveToken(result.token)
                    localStorage.setItem('userName', this.user.userName);
                    this.router.navigate(['/dashboard/' + this.user.userName]);
                }
            }, err => {

                console.log(err);
            });
    }

    getUser() {
        console.log('User object FETCHED');
        return this.http.get<{ message: string, user: User }>('http://localhost:3000/getUser');
    }

    logoutUser() {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        this.authStateListener.next(false);
        this.router.navigate(['/']);
        this.clearToken();
    }

    autoAuthUser() {
        const token = this.getTokenData();
        if (token) {
            this.token = token;
            this.isAuthenticated = true;
            this.authStateListener.next(true);
            return true;
        }
        return false;
    }

    private saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    private getTokenData() {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        return token;
    }

    private clearToken() {
        localStorage.removeItem('token');
    }
}

