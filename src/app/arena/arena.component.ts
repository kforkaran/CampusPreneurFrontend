import { Component, OnInit } from '@angular/core';
import { ArenaService } from './arena.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { Question } from '../models/question.model';

@Component({
    templateUrl: './arena.component.html',
    styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {
    currentQuestion: Question;
    currentLevel: number;
    isLoading = true;

    constructor(private arenaService: ArenaService, private authService: AuthService,
        private router: Router, private location: Location) { }

    ngOnInit() {
        this.fetchQuestion();
    }

    fetchQuestion() {
        if (!this.authService.user) {
            this.arenaService.question = null;
            this.authService.getUser()
                .subscribe(result => {
                    if (result.user) {
                        this.authService.user = result.user;
                        this.getQuestionFromArenaService();
                    }
                }, err => {
                    console.log(err);
                });
        } else {
            this.getQuestionFromArenaService();
        }
    }

    getQuestionFromArenaService() {
        if (this.arenaService.question == null) {
            this.arenaService.fetchQuestion(this.authService.user.level)
                .subscribe(fetchedQuestion => {
                    this.arenaService.question = fetchedQuestion;
                    this.currentQuestion = fetchedQuestion;
                    this.location.replaceState('/arena/' + this.currentQuestion.questionUrl);
                    this.isLoading = false;
                }, err => {
                    console.log(err);
                });
        } else {
            this.currentQuestion = this.arenaService.question;
            this.location.replaceState('/arena/' + this.currentQuestion.questionUrl);
            this.isLoading = false;
        }
    }

    onSubmitAnswer(form: NgForm) {
        if (this.currentQuestion.answer === form.value.answer) {
            this.arenaService.updateLevel()
                .subscribe(result => {
                    this.authService.user.level = this.authService.user.level + 1;
                    this.arenaService.question = null;
                    this.fetchQuestion();
                    form.resetForm();
                }, err => {
                    console.log(err);
                });
        } else {
            form.resetForm();
        }
    }
}
