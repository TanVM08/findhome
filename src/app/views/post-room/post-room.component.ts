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
import { FetchApiService } from 'src/app/common/services/api/fetch-api.service';
import { CATEGORY, DISTRICT, ROOMS, WARD } from 'src/app/common/enum/EApiUrl';
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
  lstRoomType: any = [];
  lstDistrict: any = [];
  lstWard: any = [];
  isEditable = false;
  constructor(
    private toastr: ToastNotiService,
    private dialog: MatDialog,
    public fb: FormBuilder,
    private api: FetchApiService,
  ) { }
  ngOnInit(): void {
    this.buildForm();
    this.getDataTypeRoom();
    this.getDataDistrict();
  }

  buildForm() {
    this.roomFrom = this.fb.group({
      id: [null, []],
      type: [null, [Validators.required]], //kieu phong
      total: [1, [Validators.required]], //so luong phong hien co
      capacity: [null, Validators.required],// suc chua
      acreage: [null, [Validators.required]], // dien tich
      rentalPrice: [null, [Validators.required]], //gia cho thue
      deposits: [null, [Validators.required]], // dat coc
      electricBill: [null, [Validators.required]], //tien dien
      waterBill: [null, [Validators.required]], //tien nuoc
      internetBill: [null, [Validators.required]], //tien internet
      districtId: [null, [Validators.required]], //ma quan huyen
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
      status: [null, []], //trang thai bai dang
    });
  }

  setValueToField(item: any, data: any) {
    return this.roomFrom.get(item)?.setValue(data);
  }
  getDataDistrict() {
    this.api.get(DISTRICT.GET_ALL_DATA).subscribe((res) => {
      if (res) {
        this.lstDistrict = res.data;
      }

    })
  }

  onChangeDistrict(value: any) {
    this.setValueToField("warId", null);
    this.getDataWardByDistrict(value);
  }

  getDataWardByDistrict(districtId: number) {
    this.api.get(WARD.GET_DATA_BY_DISTRICT + districtId).subscribe((res) => {
      this.lstWard = res.data;
    })

  }

  getDataTypeRoom() {
    this.api.get(CATEGORY.GET_TYPE_HOUSE, { channelGroup: 'TYPE_ROOM' }).subscribe((res) => {
      if (res) {
        this.lstRoomType = res.data
      }

    })
  }

  changeFile(event: any) {
    if (event) {
      let arrFile = event.target.files;
      if (arrFile.length < 5 || arrFile.length > 10) {
        this.toastr.showWarning(
          'Cảnh báo',
          'Upload ít nhất 5 ảnh và nhiều nhất 10 ảnh!'
        );
        return;
      }
      for (let i = 0; i < arrFile.length; i++) {
        if (!_.includes(this.acceptTypeImage, arrFile[i].type)) {
          this.toastr.showWarning(
            'Cảnh báo',
            'Chỉ được upload file có định dạng ảnh !'
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
    let dataPreview: Object = {
      data: dataSave,
      lstImage: this.listImage,
    }
    this.dialog.open(RoomPreviewComponent, {
      width: '80%',
      height: '80%',
      data: dataPreview,
    });
  }

  doSave(valueStatus: number) {
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
    this.setValueToField("status", valueStatus);
    let dataSave = this.roomFrom.value;
    let fd = new FormData();
    this.lstFile.forEach((item: any) => {
      fd.append("lstFileUpload", item);
    });
    console.log('dataSave', dataSave);
    fd.append('room', JSON.stringify(dataSave))
    console.log('fd', fd);
    this.api.post(ROOMS.CREATE_OR_UPDATE, fd).subscribe((res) => {
      console.log(res);
      if (res.data == 0) {
        this.toastr.showSuccess('Thông báo', 'Phòng của bạn đã được thêm mới');
      }
    })
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
