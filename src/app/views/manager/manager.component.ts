import { Component } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent {
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
}
