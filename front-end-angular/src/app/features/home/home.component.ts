import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit(): void {}

  profile() {
    this.authService.userProfile();
  }

}
