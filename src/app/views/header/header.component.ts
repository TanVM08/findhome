import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfo!: any
  isHide: boolean = false;
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
      position: { top: '8%' },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res == 1) {
        this.userInfo = this.auth.getUserInfo();
        if (this.userInfo?.authorities[0] == 'ADMIN') {
          this.isHide = true;
        }
      }
    });
  }

  doNavigatePage(url: string) {
    if (this.userInfo == null) {
      this.toastr.showWarning('Thông báo', 'Vui lòng đăng nhập vào website');
      this.doLogin();
    } else {
      console.log('userInfo', this.userInfo);
      this.router.navigate([url]);
    }
  }

  doOpenProfile() {
    let param: Object = {
      title: "Thêm mới user",
    }
    this.dialog.open(RegisterComponent, {
      width: '25%',
      position: { top: '5%' },
      data: param,
    });
  }

  logout() {
    this.router.navigate(['/home']);
    sessionStorage.clear();
    this.userInfo = null;
    this.isHide = false;
  }
}
