import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {}

  pageInfo: any = {
    pageSize: 10,
    page: 0,
  };
  dataList: any = [
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 1',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 2',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 3',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 0,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 4',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 0,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
    {
      avatar: '123',
      userName: 'Vũ Minh Tân 5',
      email: 'vuminhtan0103@gmail.com',
      createDate: new Date(),
      isActive: 1,
    },
  ];
  totalItems: number = 0;
  tableColumns: any = [
    {
      name: 'avatar',
      label: 'Avatar',
      options: {
        width: '10%',
      },
    },
    {
      name: 'userName',
      label: 'Tên đăng nhập',
      options: {
        width: '20%',
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        width: '20%',
      },
    },
    {
      name: 'createDate',
      label: 'Ngày tạo',
      options: {
        width: '15%',
        align: 'text-center',
        customBodyRender: (value: any) => {
          return value ? moment(value).format('DD/MM/YYYY') : '';
        },
      },
    },
    {
      name: 'isActive',
      label: 'Trạng thái',
      options: {
        width: '10%',
        align: 'text-center',
        customBodyRender: (value: any, obj: any) => {
          let strHtml = '<span';
          if (value === 1) {
            strHtml += ' class="status-success" ';
            obj['isActiveName'] = 'Đang hoạt động';
          } else {
            strHtml += ' class="status-error" ';
            obj['isActiveName'] = 'Không hoạt động';
          }
          strHtml += '>' + obj['isActiveName'] + '</span>';
          return strHtml;
        },
      },
    },
  ];
  tableAction: any = [
    {
      icon: 'fa fa-pencil-square-o',
      iconType: 1,
      tooltip: 'Chỉnh sửa',
      doAction: (item: any) => {},
    },
    {
      icon: 'fa fa-refresh',
      iconType: 1,
      tooltip: 'Khôi phục mật khẩu',
      doAction: (item: any) => {},
    },
    {
      iconType: 1,
      customIcon: (obj: any) => {
        return obj['isActive'] === 0 ? 'fa fa-unlock' : 'fa fa-lock';
      },
      customTooltip: (obj: any) => {
        return obj['isActive'] === 0 ? 'Mở khoá' : 'Khoá';
      },
      doAction: (item: any) => {
        let rs = item['isActive'] === 0 ? 2 : 1;
      },
    },
    {
      icon: 'fa fa-trash-o',
      iconType: 1,
      tooltip: 'Xóa',
      doAction: (item: any) => {},
    },
  ];
  lstStatus: any = [
    { name: '---Tất cả---', value: -1 },
    { name: 'Hoạt động', value: 1 },
    { name: 'Không hoạt động', value: 0 },
  ];

  doSearch(pageInfo?: any) {
    if (pageInfo) {
      this.pageInfo = pageInfo;
    } else {
      this.pageInfo = {
        pageSize: 10,
        page: 0,
      };
    }
  }

  doOpenDialog(){
    let param:Object={
      title:"Thêm mới user",
    }
    this.dialog.open(UserDialogComponent, {
      width: '80%',
      data: param,
    });
  }
}
