import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {NotificationService} from '../../services/notification/notification.service';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NotificationType} from '../../enum/notification-type.enum';
import {HeaderType} from '../../enum/header-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading = false;
  private subscriptions: any[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public onLogin(user: User): void {
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get('bearer');
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalStorage(response.body);
          console.log(response);
          this.router.navigateByUrl('/user/management');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  private sendErrorNotification(notification: NotificationType , message: string): void {
    if (message){
      this.notificationService.notify(notification, message);
    } else {
      this.notificationService.notify(notification, 'An error occured, please try again');
    }

  }
}
