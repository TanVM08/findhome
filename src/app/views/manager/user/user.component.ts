import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import { ROOMS, USER } from 'src/app/common/enum/EApiUrl';
import { DialogComfirmComponent } from 'src/app/common/GUI/dialog-comfirm/dialog-comfirm.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private api: FetchApiService,
    private toast: ToastNotiService,
  ) { }

  ngOnInit(): void {
    this.doSearch()
  }

  pageInfo: any = {
    pageSize: 10,
    page: 0,
  };
  userNameOrEmail!: string;
  isActive: number = -1;
  dataList: any = [];
  totalItems: number = 0;
  tableColumns: any = [
    {
      name: 'avatar',
      label: 'Avatar',
      options: {
        customBodyRender: (value: any, obj: any) => {
          if (value) {
            let strHtml =
              '<img class="avatar-user" src="data:image/jpg;base64,';
            strHtml += value;
            strHtml += '"/>';
            return strHtml;
          } else {
            return value;
          }
        },
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
      doAction: (item: any) => {
        this.doOpenDialog(item);
      },
    },
    // {
    //   icon: 'fa fa-refresh',
    //   iconType: 1,
    //   tooltip: 'Khôi phục mật khẩu',
    //   doAction: (item: any) => { },
    // },
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
        this.doLockorUnlock(item)
      },
    },
    {
      icon: 'fa fa-trash-o',
      iconType: 1,
      tooltip: 'Xóa',
      doAction: (item: any) => {
        this.doDelete(item);
      },
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

    let param = {
      userNameOrEmail: this.userNameOrEmail,
      isActive: this.isActive,
      page: this.pageInfo.page,
      pageSize: this.pageInfo.pageSize,
    }
    this.api.post(USER.SEARCH_DATA, param).subscribe(res => {
      console.log(res);
      if (res) {
        this.dataList = res.data.list;
        this.totalItems = res.data.count
      }

    })
  }

  doOpenDialog(item: any) {
    let param: Object = {
      title: item ? "Chỉnh sửa thông tin người dùng" : "Thêm mới người dùng",
      id: item.id
    }
    this.dialog.open(UserDialogComponent, {
      width: '80%',
      data: param,
    });
  }

  doDelete(item: any) {
    let param = {
      title: 'Xóa dữ liệu',
      message: 'Bạn có muốn xóa user ' + item.userName
    }
    const dialogRef = this.dialog.open(DialogComfirmComponent, {
      width: '40%',
      data: param,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.post(USER.DELETE_USER + item.id).subscribe(res => {
          if (res.status == 200) {
            this.toast.showSuccess('Thông báo', 'Xóa tài khoản thành công');
            this.doSearch();
          }
        })
      }
    });
  }

  doLockorUnlock(item: any) {
    let ms = item.isActive == 1 ? 'Khóa tài khoản ' : 'Mở khóa tài khoản ';
    let param = {
      title: ms,
      message: 'Bạn có muốn ' + ms + item.userName
    }
    const dialogRef = this.dialog.open(DialogComfirmComponent, {
      width: '40%',
      data: param,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.post(USER.LOCK_OR_UNLOCK + item.id).subscribe(res => {
          if (res.status == 200) {
            this.toast.showSuccess('Thông báo', ms + ' thành công');
            this.doSearch();
          }
        })
      }
    });
  }
}

