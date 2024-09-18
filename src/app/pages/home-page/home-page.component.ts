import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User } from '@features/user/models/User.model';
import { SessionService } from '@services/SessionService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private sessionService: SessionService = inject<SessionService>(SessionService);
  user: Observable<User | undefined> = this.sessionService.getUser();
}
