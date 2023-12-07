import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  pageInfo: any = {
    pageSize: 10,
    page: 0,
  };
  dataList: any = [];
  totalItems: number = 0;
  tableColumns: any = [
    {
      name: 'paymentChannelCode',
      label: 'Kênh thực hiện giao dịch',
      options: {
        width: '10%',
      },
    },
    {
      name: 'paymentTypeName',
      label: 'Hình thức giao dịch',
      options: {
        width: '20%',
      },
    },
    {
      name: 'url',
      label: 'URL',
      options: {
        width: '30%',
      },
    },
    {
      name: 'devMode',
      label: 'Môi trường',
      options: {
        width: '10%',
        align: 'text-center',
        customBodyRender: (value: any, obj: any) => {
          return value == 0 ? 'UAT' : 'DEV';
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
      icon: 'feather icon-edit',
      tooltip: 'Cập nhật',
      iconType: 1,
      doAction: (item: any) => {},
    },
    {
      iconType: 1,
      customIcon: (obj: any) => {
        return obj['isActive'] === 0
          ? 'feather icon-check-circle'
          : 'feather icon-slash';
      },
      customTooltip: (obj: any) => {
        return obj['isActive'] === 0 ? 'Đang hoạt động' : 'Không hoạt động';
      },
      doAction: (item: any) => {},
    },
  ];
  lstStatus: any = [
    { name: '---Tất cả---', value: -1 },
    { name: 'DEV', value: 1 },
    { name: 'UAT', value: 0 },
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
}
