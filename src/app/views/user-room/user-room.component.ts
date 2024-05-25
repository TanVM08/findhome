import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CATEGORY, ROOMS } from 'src/app/common/enum/EApiUrl';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-user-room',
  templateUrl: './user-room.component.html',
  styleUrls: ['./user-room.component.scss']
})
export class UserRoomComponent implements OnInit {
  dataList:any=[];
  lstTypeHouse:any=[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: FetchApiService,
    private toast: ToastNotiService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getDataTypeHouse();
    this.getUserRoom();
  }

  getDataTypeHouse() {
    this.api.get(CATEGORY.GET_TYPE_HOUSE, { channelGroup: 'TYPE_ROOM' }).subscribe((res) => {
      if (res) {
        this.lstTypeHouse = res.data
      }

    })
  }

  typeHouse(type: number) {
    return _.find(this.lstTypeHouse, (item) => {
      return item.value == type;
    }).displayName;
  }

  titleSearch(type: number, district: String, ward: String) {
    let title;
    title = _.find(this.lstTypeHouse, (item) => {
      return item.value == type;
    }).displayName;
    return `${title} ${district} ${ward}`;
  }

  convertStatus(status:number){
    if(status==1){
      return 'Tạo nháp'
    }else if(status==2){
      return 'Đang duyệt'
    }else{
      return 'Đã duyệt'
    }
  }

  getUserRoom() {
    this.api.get(ROOMS.GET_DATA_BY_USER_ID).subscribe((res: any) => {
      console.log('dataUserRoom', res);
      if(res){
        this.dataList=res.data;
      }
    })
  }

  doDetail(id:number){
    const navigationExtras: NavigationExtras = {
      state: {
        data: id,
      }
    };
    this.router.navigate(['/detail'],navigationExtras);
  }

}
