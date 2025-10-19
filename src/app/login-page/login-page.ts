import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-page',
  imports: [FontAwesomeModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  faLogin = faRightToBracket;
}
