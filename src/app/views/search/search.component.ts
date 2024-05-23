import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CATEGORY, DISTRICT } from 'src/app/common/enum/EApiUrl';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  colorBase = 'accent' as ThemePalette;
  priceStart = 0;
  priceEnd = 5000000;
  page: number = 0;
  pageSize: number = 10;
  totalItems: number = 50;
  lstDistrict: any = [];

  lstWard: any = [];

  lstAccuracy: any = [
    {
      value: -1,
      name: '--Tất cả--',
    },
    {
      value: 1,
      name: 'Đã xác thực',
    },
    {
      value: -1,
      name: 'Chưa xác thực',
    },
  ];

  lstTypeHouse: any = [];
  constructor(
    private api: FetchApiService,
    private toast: ToastNotiService,
  ) { }



  formatLabel(value: number): string {
    if (value >= 500000) {
      return value / 1000000 + 'tr';
    }

    return `${value}`;
  }

  isCheck() {
    console.log('priceStart', this.priceStart);
    console.log('priceEnd', this.priceEnd);
  }
  ngOnInit(): void {
    this.getDataTypeHouse();
    this.getDataDistrict();
  }

  getDataDistrict() {
    this.api.get(DISTRICT.GET_ALL_DATA).subscribe((res) => {
      if (res) {
        this.lstDistrict = res.data;
      }

    })
  }

  getDataTypeHouse() {
    this.api.get(CATEGORY.GET_TYPE_HOUSE, { channelGroup: 'TYPE_ROOM' }).subscribe((res) => {
      if (res) {
        console.log(res);
        this.lstTypeHouse=res.data
      }

    })
  }

  onChangePage(item: any) { }
}
