import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CATEGORY, DISTRICT, ROOMS } from 'src/app/common/enum/EApiUrl';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import * as _ from 'lodash';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  colorBase = 'accent' as ThemePalette;
  priceStart = 0;
  priceEnd = 5000000;
  lstDistrict: any = [];
  lstWard: any = [];
  page: number = 0;
  pageSize: number = 10;
  totalItems: number = 50;
  dataList: any = [];

  districtId!: number;
  rentalPrice!: number;
  acreage!: number;
  type!: number;
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
    private router: Router,
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
    this.doSearch();
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
        this.lstTypeHouse = res.data
      }

    })
  }

  doSearch() {
    let param = {
      type: this.type,
      districtId: this.districtId,
      acreage: this.acreage,
      page: this.page,
      pageSize: this.pageSize,
    }
    debugger
    this.api.post(ROOMS.SEARCH_DATA, param).subscribe((res) => {
      if (res) {
        this.dataList = res.data.list;
        this.totalItems = res.data.count;
      }
    })
  }

  titleSearch(type: number, district: String, ward: String) {
    let title;
    title = _.find(this.lstTypeHouse, (item) => {
      return item.value == type;
    }).displayName;
    return `${title} ${district} ${ward}`;
  }

  typeHouse(type: number) {
    return _.find(this.lstTypeHouse, (item) => {
      return item.value == type;
    }).displayName;
  }

  getImg(item: any) {
    return item.pathStorage;
  }

  doDetail(id:number){
    const navigationExtras: NavigationExtras = {
      state: {
        data: id,
      }
    };
    this.router.navigate(['/detail'],navigationExtras);
  }

  onChangePage(item: any) { }
}
