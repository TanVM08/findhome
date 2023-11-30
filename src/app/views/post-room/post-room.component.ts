import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUtils } from 'src/app/common/utils/file-utils';
import * as _ from 'lodash';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
@Component({
  selector: 'app-post-room',
  templateUrl: './post-room.component.html',
  styleUrls: ['./post-room.component.scss'],
})
export class PostRoomComponent implements OnInit {
  timeShow: boolean = false;
  imgBase64!: string;
  lstFile: any = [];
  listImage: any = [];
  acceptTypeImage: string[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/pdf',
    'image/psd',
  ];
  lstRoomType: any = [
    {
      value: 1,
      name: 'Phòng cho thuê',
    },
    {
      value: 2,
      name: 'Phòng ở ghép',
    },
    {
      value: 1,
      name: 'Nhà nguyên căn',
    },
    {
      value: 1,
      name: 'Căn hộ',
    },
    {
      value: 1,
      name: 'Ký túc xá/Homestay',
    },
  ];
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;
  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastNotiService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  changeFile(event: any) {
    if (event) {
      let arrFile = event.target.files;
      for (let i = 0; i < arrFile.length; i++) {
        if (!_.includes(this.acceptTypeImage, arrFile[i].type)) {
          this.toastr.showWarning(
            'Chỉ được upload file có định dạng ảnh hoặc video!'
          );
          return;
        } else if (_.includes(this.acceptTypeImage, arrFile[i].type)) {
          let fileObj = arrFile[i];
          this.lstFile.push(fileObj);
          let fileUtils = new FileUtils();
          let img = {
            name: fileObj['name'],
            imgData: '',
            fileContent: fileObj,
          };
          fileUtils.convertFileToBase64(fileObj).subscribe((base64) => {
            img['imgData'] = base64;
          });
          this.listImage.push(img);
        }
      }
      event.target.value = '';
    }
  }

  removeFile(index: any) {
    this.listImage.splice(index, 1);
    this.lstFile.splice(index, 1);
  }

  doPreview(item: any) {
    let params = {
      imgName: item.name,
      fileContent: item.imgData,
    };

    this.dialog.open(ImagePreviewComponent, {
      width: '50%',
      data: params,
    });
  }
}
