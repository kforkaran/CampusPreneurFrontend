import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ArenaService {
    question: Question;
    user: User;
    wasAnswerCorrect: boolean;
    constructor(private http: HttpClient, private authService: AuthService) { }

    fetchQuestion(questionLevel: number) {
        return this.http.get<Question>('http://localhost:3000/arena/' + questionLevel);
    }


    updateLevel() {
        return this.http.post<{ message: string, user: User }>('http://localhost:3000/arena/', { level: this.question.level });
    }
}
