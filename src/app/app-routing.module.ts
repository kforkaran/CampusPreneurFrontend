import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { ArenaComponent } from './arena/arena.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth/auth.guard';
import { LevelsComponent } from './levels/levels.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'arena', component: ArenaComponent, canActivate: [AuthGuard] },
    { path: 'levels', component: LevelsComponent, canActivate: [AuthGuard] },
    { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'dashboard', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
