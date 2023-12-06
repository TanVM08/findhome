import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUtils } from 'src/app/common/utils/file-utils';
import * as _ from 'lodash';
import { ToastNotiService } from 'src/app/common/services/toastr/toast-noti.service';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RoomPreviewComponent } from '../room-preview/room-preview.component';
import { REGEX_PATERN } from 'src/app/common/enum/ERegexPatern';
@Component({
  selector: 'app-post-room',
  templateUrl: './post-room.component.html',
  styleUrls: ['./post-room.component.scss'],
})
export class PostRoomComponent implements OnInit {
  public Editor = ClassicEditor;
  timeShow: boolean = false;
  imgBase64!: string;
  lstFile: any = [];
  listImage: any = [];
  roomFrom!: FormGroup;
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
  isEditable = false;
  constructor(
    private toastr: ToastNotiService,
    private dialog: MatDialog,
    public fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.roomFrom = this.fb.group({
      id: [null, []],
      type: [null, [Validators.required]], //kieu phong
      totalRToom: [1, [Validators.required]], //so luong phong hien co
      acreage: [null, [Validators.required]], // dien tich
      rentalPrice: [null, [Validators.required]], //gia cho thue
      deposits: [null, [Validators.required]], // dat coc
      electricBill: [null, [Validators.required]], //tien dien
      waterBill: [null, [Validators.required]], //tien nuoc
      internetBill: [null, [Validators.required]], //tien internet
      districId: [null, [Validators.required]], //ma quan huyen
      warId: [null, [Validators.required]], //ma xa phuong thi tran
      address: [null, [Validators.required, Validators.maxLength(500)]], //ten duong,so nha
      title: ['', [Validators.required, Validators.maxLength(200)]], // tieu de
      description: [null, [Validators.required]], // mo ta
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(REGEX_PATERN.PHONE_NUMBER)],
      ], // so dien thoai
      timeStart: [null, []], //gio mo cua
      timeEnd: [null, []], //gio dong cua
      // status: [null, [Validators.required]], //trang thai bai dang
    });
  }

  changeFile(event: any) {
    if (event) {
      let arrFile = event.target.files;
      for (let i = 0; i < arrFile.length; i++) {
        if (!_.includes(this.acceptTypeImage, arrFile[i].type)) {
          this.toastr.showWarning('Chỉ được upload file có định dạng ảnh !');
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
    let param = {
      imgActive: item,
      lstImage: this.listImage,
    };
    this.dialog.open(ImagePreviewComponent, {
      width: '50%',
      data: param,
    });
  }

  isPreviewRoom() {
    if (this.roomFrom.invalid) {
      this.roomFrom.markAllAsTouched();
      this.toastr.showWarning('Thông báo', 'Kiểm tra thông tin đầu vào');
      return;
    }

    if (this.listImage.length == 0) {
      this.toastr.showWarning(
        'Thông báo',
        'Vui lòng upload hình ảnh phòng của bạn !'
      );
      return;
    }
    let dataSave = this.roomFrom.value;
    dataSave.lstImage = this.listImage;
    this.dialog.open(RoomPreviewComponent, {
      width: '80%',
      height: '80%',
      data: dataSave,
    });
  }

  doSave() {
    if (this.roomFrom.invalid) {
      this.roomFrom.markAllAsTouched();
      this.toastr.showWarning('Thông báo', 'Kiểm tra thông tin đầu vào');
      return;
    }
    let dataSave = this.roomFrom.value;
    console.log('dataSave', dataSave);
  }

  isCheckShowTime() {
    if (this.timeShow) {
      this.roomFrom.get('timeStart')?.setValidators([Validators.required]);
      this.roomFrom.get('timeEnd')?.setValidators([Validators.required]);
      this.roomFrom.get('timeStart')?.updateValueAndValidity();
      this.roomFrom.get('timeEnd')?.updateValueAndValidity();
    } else {
      this.roomFrom.get('timeStart')?.reset();
      this.roomFrom.get('timeEnd')?.reset();
      this.roomFrom.get('timeStart')?.clearValidators();
      this.roomFrom.get('timeEnd')?.clearValidators();
      this.roomFrom.get('timeStart')?.updateValueAndValidity();
      this.roomFrom.get('timeEnd')?.updateValueAndValidity();
    }
  }
}
