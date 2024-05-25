import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth/auth.service';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  constructor(private auth: AuthService,) { }
  userInfo!: any
  ngOnInit(): void {
    this.getUserInfo();
  }

  lstMenuItem: any = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'people_outline',
      label: 'Quản lý người dùng',
      route: 'user',
    },
    {
      icon: 'library_books',
      label: 'Quản lý bài đăng',
      route: 'dashboards',
    },
    {
      icon: 'playlist_add_check',
      label: 'Duyệt bài',
      route: 'users',
    },
  ];

  getUserInfo() {
    this.userInfo = this.auth.getUserInfo();
  }
}
