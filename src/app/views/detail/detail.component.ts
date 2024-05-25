import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROOMS } from 'src/app/common/enum/EApiUrl';
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  dataDetail!: any
  imgMain!: String;
  listImg: any = [];
  count: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: FetchApiService,
    private toast: ToastNotiService,
    private dialog: MatDialog,
  ) {
    const navigation = this.router.getCurrentNavigation();
    let id = navigation?.extras?.state?.['data'];
    this.getDataDetail(id);
  }

  ngOnInit(): void { }

  getDataDetail(id: any) {
    this.api.get(ROOMS.GET_DATA_DETAIL + id).subscribe((res) => {
      if (res) {
        this.dataDetail = res.data;
        this.listImg = _.map(res.data.lstImg, 'pathStorage');
        console.log(res);
        if (this.listImg.length > 5) {
          this.count = this.listImg.length - 5;
        }
      }
    })
  }

  doPreview(item: any) {
    let param = {
      imgActive: item,
      lstImage: this.listImg,
    };
    this.dialog.open(ImagePreviewComponent, {
      width: '50%',
      data: param,
    });
  }


}
