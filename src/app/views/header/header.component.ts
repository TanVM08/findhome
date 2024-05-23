import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfo!:any
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastNotiService,

  ) { }
  ngOnInit(): void { }

  doLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '25%',
      // disableClose: true,
      position: { top: '8%' },
    });

    dialogRef.afterClosed().subscribe(() => {
      // this.doSearch();
    });
  }

  doNavigatePage(url: string) {
     this.userInfo = this.auth.getUserInfo();
    if (this.userInfo == null) {
      this.toastr.showWarning('Thông báo', 'Vui lòng đăng nhập vào website');
      this.doLogin();
    } else {
      console.log('userInfo', this.userInfo);
      this.router.navigate([url]);
    }
  }
}
