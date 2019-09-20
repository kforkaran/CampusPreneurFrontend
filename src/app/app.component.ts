import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { User } from './models/user.model';
import { ArenaService } from './arena/arena.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CampusPreneur';
  showHeader = false;

  constructor(private route: Router, private authService: AuthService, private arenaService: ArenaService) {
    route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        if (event.url === '/' || event.url === '/login' || event.url === '/signup') {
          this.showHeader = false;
          this.arenaService.question = null;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  ngOnInit() {
    if (this.authService.autoAuthUser()) {
      this.route.navigate(['/dashboard' + localStorage.getItem('userName')]);
    }
  }
}
